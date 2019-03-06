import { UserCivilizationDTO } from './../dtos/user-civilization';
import { HoverManager } from './hover-manager';
import { Injectable } from '@angular/core';
import { StarRenderer } from './star-renderer';
import { Camera } from './camera';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { CoreService } from '../services/core.service';
import { HoverHubRenderer } from './hover-hub-renderer';
import { PlanetRenderer } from './planet-renderer';
import { GameObject } from '../game-objects/game-object';
import { Store } from '../store';

@Injectable({
  providedIn: 'root'
})
export class GalaxyMap {

  private gl: any;
  private animate: boolean;
  private starRenderer: StarRenderer;
  private planetRenderer: PlanetRenderer;
  private camera: Camera;
  private hoverManager: HoverManager;
  private hoverHubRenderer: HoverHubRenderer;
  private _selected: GameObject;
  private _mouseX: number;
  private _mouseY: number;
  private mouseDownX: number;
  private mouseDownY: number;
  private mouseDown: boolean;
  private mouseDownCameraX: number;
  private mouseDownCameraY: number;

  constructor(private core: CoreService, shaderCompiler: ShaderProgramCompiler, private store: Store) {
    this.camera = new Camera();
    this.animate = true;
    this.starRenderer = new StarRenderer(this.camera, shaderCompiler);
    this.planetRenderer = new PlanetRenderer(this.camera, shaderCompiler);
    this.hoverHubRenderer = new HoverHubRenderer(this.camera, shaderCompiler);
    this.hoverManager = new HoverManager(store, this.starRenderer, this.planetRenderer, this.camera);

    this.focusHome();
    core.getCurrentCivilization().subscribe((civ: UserCivilizationDTO) => {
      this.camera.x = civ.homeworld.starSystem.x;
      this.camera.y = civ.homeworld.starSystem.y;
      this.camera.zoom = 5;
      this._selected = {...civ.homeworld.starSystem, objectType: 'StarSystem'};
    });

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
    this.planetRenderer.setup(gl);
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

    if (this.hovered) {
      this.hoverHubRenderer.prepareRender(gl);
      this.hoverHubRenderer.render(gl, this.hovered);
    }
    if (this.selected) {
      this.hoverHubRenderer.prepareRender(gl);
      this.hoverHubRenderer.render(gl, this.selected);
    }

    this.starRenderer.prepareRender(gl);
    this.store.starSystems.forEach(starSystem => {
        this.starRenderer.render(gl, starSystem);
    });


    this.planetRenderer.prepareRender(gl);
    this.store.planets.forEach(planet => {
        this.planetRenderer.render(gl, planet);
    });
  }

  setViewport(width: number, height: number) {
      this.gl.viewport(0, 0, width, height);
      this.camera.aspectRatio = width / height;
  }

  zoomEvent(delta: number): any {
    let x = this._mouseX / this.camera.zoom * this.camera.aspectRatio + this.camera.x;
    let y = this._mouseY / this.camera.zoom + this.camera.y;

    if (this.selected) {
      x = this.selected.x;
      y = this.selected.y;
    } else if (this.hovered) {
      x = this.hovered.x;
      y = this.hovered.y;
    }

    if (delta < 0) {
      this.camera.zoomIn(x, y);
    } else {
      this.camera.zoomOut(x, y);
    }
  }

  mouseMoveOnWindow(x: number, y: number): any {
    this._mouseX = x;
    this._mouseY = y;
    this.hoverManager.mouseMoved(x, y);
    if (this.mouseDown) {
      const dx = (this.mouseDownX - this._mouseX) * 100;
      const dy = (this.mouseDownY - this._mouseY) * 100;
      const epsilon = 1;
      const delta = dx * dx + dy * dy;
      if (delta < epsilon) {
        return;
      }
      const offseX = (x - this.mouseDownX) / this.camera.zoom * this.camera.aspectRatio;
      const offseY = (y - this.mouseDownY) / this.camera.zoom;
      this.camera.x = this.mouseDownCameraX - offseX;
      this.camera.y = this.mouseDownCameraY - offseY;
    }
  }

  public get hovered(): GameObject {
    return this.hoverManager.hovered;
  }

  public get selected(): GameObject {
    return this._selected;
  }

  mouseClick(): void {
    const dx = (this.mouseDownX - this._mouseX) * 100;
    const dy = (this.mouseDownY - this._mouseY) * 100;
    const epsilon = 2;
    const delta = dx * dx + dy * dy;
    if (delta > epsilon) {
      return;
    }
    this._selected = this.hovered;
  }

  onMouseDown() {
    this.mouseDown = true;
    this.mouseDownX = this._mouseX;
    this.mouseDownY = this._mouseY;
    this.mouseDownCameraX = this.camera.x;
    this.mouseDownCameraY = this.camera.y;

  }

  onMouseUp() {
    this.mouseDown = false;
  }

  deselect() {
    this._selected = null;
  }

  focusHome(): void {
    if (this.core.hasCivilization) {
      const civ = this.core.currentCivilization;
      this.camera.x = civ.homeworld.starSystem.x;
      this.camera.y = civ.homeworld.starSystem.y;
      this.camera.zoom = 5;
      this._selected = {...civ.homeworld.starSystem, objectType: 'StarSystem'};
    }
  }
}
