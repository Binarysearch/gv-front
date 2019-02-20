import { Injectable } from '@angular/core';
import { StarRenderer } from './star-renderer';
import { StarSystemsService } from './services/star-systems.service';
import { Camera } from './camera';
import { Renderer } from './renderer';

@Injectable({
  providedIn: 'root'
})
export class GalaxyRenderer implements Renderer{

    constructor(private starSystemsService: StarSystemsService, private starRenderer: StarRenderer, private camera: Camera){}

    setup(){
        let gl = this.camera.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.starRenderer.setup();
    }

    prepareRender(){}

    render(){
        this.starRenderer.prepareRender();
        this.starSystemsService.starSystems.forEach(starSystem => {
            this.starRenderer.render(starSystem);
        });
    }
}
