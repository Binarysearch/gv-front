import { Injectable } from '@angular/core';
import { Camera } from './camera';
import { StarSystem } from './services/star-systems.service';
import { Renderer } from './renderer';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { STAR_SYSTEM_VS_SOURCE } from './gl/shaders/star-system/vertex-shader';
import { STAR_SYSTEM_FS_SOURCE } from './gl/shaders/star-system/fragment-shader';

@Injectable({
    providedIn: 'root'
})
export class StarRenderer implements Renderer{
    program: WebGLShader;
    vao: WebGLVertexArrayObjectOES;
    timeUniformLocation: WebGLUniformLocation;
    hoverUniformLocation: WebGLUniformLocation;
    aspectUniformLocation: WebGLUniformLocation;
    scaleUniformLocation: WebGLUniformLocation;
    zoomUniformLocation: WebGLUniformLocation;
    positionUniformLocation: WebGLUniformLocation;
    colorUniformLocation: WebGLUniformLocation;
    civilizationColorUniformLocation: WebGLUniformLocation;

    constructor(private camera: Camera, private shaderCompiler: ShaderProgramCompiler){}

    setup(){
        let gl = this.camera.gl as WebGLRenderingContext;
        this.program = this.shaderCompiler.createShaderProgram(gl, STAR_SYSTEM_VS_SOURCE, STAR_SYSTEM_FS_SOURCE);
        
        this.vao = (gl as any).createVertexArray();
        (gl as any).bindVertexArray(this.vao);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,0,  -1,-1,0,  1,-1,0,  1,1,0, -1,1,0, 1,-1,0]), gl.STATIC_DRAW);
        
        let coord = gl.getAttribLocation(this.program, "position");
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

        this.timeUniformLocation = gl.getUniformLocation(this.program, "time");
        this.hoverUniformLocation = gl.getUniformLocation(this.program, "hover");
        this.aspectUniformLocation = gl.getUniformLocation(this.program, "aspect");
        this.scaleUniformLocation = gl.getUniformLocation(this.program, "scale");
        this.zoomUniformLocation = gl.getUniformLocation(this.program, "zoom");
        this.positionUniformLocation = gl.getUniformLocation(this.program, "pos");
        this.colorUniformLocation = gl.getUniformLocation(this.program, "color");
        this.civilizationColorUniformLocation = gl.getUniformLocation(this.program, "civilizationColor");
    }
    
    prepareRender(){
        let zoom = this.camera.zoom;
        let aspect = this.camera.aspectRatio;
        this.camera.gl.enable(this.camera.gl.BLEND);
        this.camera.gl.blendFunc(this.camera.gl.SRC_ALPHA, this.camera.gl.ONE_MINUS_SRC_ALPHA);
        this.camera.gl.useProgram(this.program);
        this.camera.gl.bindVertexArray(this.vao);
        
        var time = (656454%(Math.PI*2000))*0.001;

        this.camera.gl.uniform1f(this.timeUniformLocation, time);
        this.camera.gl.uniform1f(this.zoomUniformLocation, zoom);
        this.camera.gl.uniform1f(this.aspectUniformLocation, aspect);
    }

    render(star: StarSystem){
        let gl = this.camera.gl;
        let zoom = this.camera.zoom;
        let nz = 4;

        //z de estrella
        let starz = 0;

        if(nz*zoom < starz){
            return;
        }

        let s = star.size* Math.min(Math.max((nz*zoom-starz)/(nz*zoom), 0), 1); 
        var scale = (0.015*s + 0.01)/zoom+0.0001;
        
        gl.uniform3f(this.civilizationColorUniformLocation, 1, 1, 1);
        gl.uniform1f(this.scaleUniformLocation, scale);
        gl.uniform2f(this.positionUniformLocation, star.x-this.camera.x, star.y-this.camera.y);
        gl.uniform3f(this.colorUniformLocation, 1, 1, 1);
        gl.uniform1f(this.hoverUniformLocation, 0.0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
    }
}