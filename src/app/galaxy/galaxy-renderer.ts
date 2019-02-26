import { StarSystem } from './../services/star-systems.service';
import { Injectable } from '@angular/core';
import { StarRenderer } from './star-renderer';
import { Camera } from './camera';
import { Renderer } from './renderer';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { CoreService } from '../services/core.service';

@Injectable({
  providedIn: 'root'
})
export class GalaxyRenderer implements Renderer {

  private gl: any;
  private animate: boolean;
  private starRenderer: StarRenderer;
  private camera: Camera;
  private _mouseX: number;
  private _mouseY: number;
  private _hovered: StarSystem;

  constructor(private core: CoreService, private shaderCompiler: ShaderProgramCompiler) {
    this.camera = new Camera();
    this.animate = true;
    this.starRenderer = new StarRenderer(this.camera, shaderCompiler);
    const animate = () => {
      if (this.animate) {
        window.requestAnimationFrame(animate);
        if (this.gl) {
          this.update();
          this.render(this.gl);
        }
      }
    };
    animate();
  }

  setup(gl: any) {
    this.animate = false;
    this.gl = gl;
    this.starRenderer.setup(gl);
    this.animate = true;
    gl.clearColor(0, 0, 0, 1);
  }

  prepareRender() {}

  update() {
    this.camera.update();
  }

  render(gl: any) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.starRenderer.prepareRender(gl);
      this.core.starSystems.forEach(starSystem => {
          this.starRenderer.render(gl, starSystem);
      });
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
    this._mouseX = x;
    this._mouseY = y;

    this.camera.mouseMoved(x, y);

    this.checkHover();
  }

  private checkHover() {
    const intersectingStars = this.getintersectingStars(this._mouseX, this._mouseY);

    const closest = this.getClosestElement([intersectingStars]);

    this._hovered = closest;
  }

  getClosestElement(elements: {x: number, y: number, element: {}}[][]) {
    let minDist = 10000000;
    let closest = null;
    elements.forEach( e => {
      e.forEach(s => {
        const x = s.x * this.camera.zoom / this.camera.aspectRatio - this._mouseX;
        const y = s.y * this.camera.zoom - this._mouseY;
        const dist = Math.sqrt(x * x + y * y);
        if (dist < minDist) {
          minDist = dist;
          closest = s.element;
        }
      });
    });

    return closest;
  }

  getintersectingStars(x: number, y: number) {
    const intersectingStars = [];

    this.core.starSystems.forEach(ss => {

      const scale = this.starRenderer.getStarRenderScale(ss);
      const cx = ss.x - this.camera.x;
      const cy = ss.y - this.camera.y;
      const left = (cx - scale) * this.camera.zoom / this.camera.aspectRatio;
      const right = (cx + scale) * this.camera.zoom / this.camera.aspectRatio;
      const bottom = (cy - scale) * this.camera.zoom;
      const top = (cy + scale) * this.camera.zoom;

      if (x > left && x < right && y > bottom && y < top) {
        intersectingStars.push({element: ss, x: cx, y: cy});
      }
    });
    return intersectingStars;
  }

  mouseOut() {
    this.camera.stopMoving();
  }

  public get hovered(): StarSystem {
    return this._hovered;
  }
}
