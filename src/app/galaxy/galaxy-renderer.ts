import { GameObject } from './../entities/game-object';
import { HoverManager } from './hover-manager';
import { Injectable } from '@angular/core';
import { StarRenderer } from './star-renderer';
import { Camera } from './camera';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { CoreService } from '../services/core.service';
import { HoverHubRenderer } from './hover-hub-renderer';

@Injectable({
  providedIn: 'root'
})
export class GalaxyRenderer {

  private gl: any;
  private animate: boolean;
  private starRenderer: StarRenderer;
  private camera: Camera;
  private hoverManager: HoverManager;
  hoverHubRenderer: HoverHubRenderer;

  constructor(private core: CoreService, shaderCompiler: ShaderProgramCompiler) {
    this.camera = new Camera();
    this.animate = true;
    this.starRenderer = new StarRenderer(this.camera, shaderCompiler);
    this.hoverHubRenderer = new HoverHubRenderer(this.camera, shaderCompiler);
    this.hoverManager = new HoverManager(core, this.starRenderer, this.camera);
    const animate = () => {
      if (this.animate) {
        window.requestAnimationFrame(animate);
        if (this.gl) {
          this.update();
          this.render();
        }
      }
    };
    animate();
  }

  setup(gl: any) {
    this.animate = false;
    this.gl = gl;
    this.starRenderer.setup(gl);
    this.hoverHubRenderer.setup(gl);
    this.animate = true;
    gl.clearColor(0, 0, 0, 1);
  }

  update() {
    this.camera.update();
  }

  render() {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.starRenderer.prepareRender(gl);
    this.core.starSystems.forEach(starSystem => {
        this.starRenderer.render(gl, starSystem);
    });


    if (this.hovered) {
      this.hoverHubRenderer.prepareRender(gl);
      this.hoverHubRenderer.render(gl, this.hovered);
    }
  }

  setViewport(width: number, height: number) {
      this.gl.viewport(0, 0, width, height);
      this.camera.aspectRatio = width / height;
  }

  zoomEvent(delta: number): any {
    if (delta < 0) {
      this.camera.zoomIn();
    } else {
      this.camera.zoomOut();
    }
  }

  mouseMoveEvent(x: number, y: number): any {
    this.hoverManager.mouseMoved(x, y);
  }

  mouseMoveOnWindow(x: number, y: number): any {
    this.camera.mouseMoved(x, y);
  }

  mouseOut() {
    this.camera.stopMoving();
  }

  public get hovered(): GameObject {
    return this.hoverManager.hovered;
  }
}
