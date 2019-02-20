import { Injectable } from '@angular/core';
import { StarRenderer } from './star-renderer';
import { StarSystemsService } from './services/star-systems.service';
import { Camera } from './camera';
import { Renderer } from './renderer';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';

@Injectable({
  providedIn: 'root'
})
export class GalaxyRenderer implements Renderer{

    private gl: any;
    private animate: boolean = true;
    private starRenderer: StarRenderer;
    private camera: Camera
    
    constructor(private starSystemsService: StarSystemsService, private shaderCompiler: ShaderProgramCompiler){
        this.camera = new Camera();
        this.starRenderer = new StarRenderer(this.camera, shaderCompiler);
        let animate = () => {
            if(this.animate){
                window.requestAnimationFrame(animate);
                if(this.gl){
                    this.render(this.gl);
                }
            }
        };
        animate();
    }

    setup(gl: any){
        this.animate = false;
        this.gl = gl;
        this.starRenderer.setup(gl);
        this.animate = true;
        gl.clearColor(0, 0, 0, 1);
    }

    prepareRender(){}

    render(gl: any){
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.starRenderer.prepareRender(gl);
        this.starSystemsService.starSystems.forEach(starSystem => {
            this.starRenderer.render(gl, starSystem);
        });
    }

    setViewport(width: number, height: number){
        this.gl.viewport(0, 0, width, height);
        this.camera.aspectRatio = width / height;
    }
}
