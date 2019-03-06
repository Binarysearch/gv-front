import { Camera } from './camera';
import { Renderer } from './renderer';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { HOVER_HUB_VS_SOURCE, HOVER_HUB_FS_SOURCE } from './gl/shaders/hover-hub-shader';
import { GameObject } from '../game-objects/game-object';

export class HoverHubRenderer implements Renderer {
    program: WebGLShader;
    vao: WebGLVertexArrayObjectOES;
    timeUniformLocation: WebGLUniformLocation;
    aspectUniformLocation: WebGLUniformLocation;
    scaleUniformLocation: WebGLUniformLocation;
    zoomUniformLocation: WebGLUniformLocation;
    positionUniformLocation: WebGLUniformLocation;
    colorUniformLocation: WebGLUniformLocation;

    constructor(private camera: Camera, private shaderCompiler: ShaderProgramCompiler) {}

    setup(gl: any) {
        this.program = this.shaderCompiler.createShaderProgram(gl, HOVER_HUB_VS_SOURCE, HOVER_HUB_FS_SOURCE);

        this.vao = (gl as any).createVertexArray();
        (gl as any).bindVertexArray(this.vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 0,  -1, -1, 0,  1, -1, 0,  1, 1, 0, -1, 1, 0, 1, -1, 0]), gl.STATIC_DRAW);

        const coord = gl.getAttribLocation(this.program, 'position');
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

        this.timeUniformLocation = gl.getUniformLocation(this.program, 'time');
        this.aspectUniformLocation = gl.getUniformLocation(this.program, 'aspect');
        this.scaleUniformLocation = gl.getUniformLocation(this.program, 'scale');
        this.zoomUniformLocation = gl.getUniformLocation(this.program, 'zoom');
        this.positionUniformLocation = gl.getUniformLocation(this.program, 'pos');
        this.colorUniformLocation = gl.getUniformLocation(this.program, 'color');
    }

    prepareRender(gl: any) {
        const zoom = this.camera.zoom;
        const aspect = this.camera.aspectRatio;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.useProgram(this.program);
        gl.bindVertexArray(this.vao);

        const time = (Date.now() % (Math.PI * 2000)) * 0.001;

        gl.uniform1f(this.timeUniformLocation, time);
        gl.uniform1f(this.zoomUniformLocation, zoom);
        gl.uniform1f(this.aspectUniformLocation, aspect);
    }

    render(gl: any, hub: GameObject) {
        gl.uniform1f(this.scaleUniformLocation, this.getElementRenderScale(hub));
        gl.uniform2f(this.positionUniformLocation, hub.x - this.camera.x, hub.y - this.camera.y);
        gl.uniform3f(this.colorUniformLocation, 1, 1, 1);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    getElementRenderScale(ss: GameObject): number {
      return 0.1;
    }
}
