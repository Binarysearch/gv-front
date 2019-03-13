import { StarSystem } from 'src/app/game-objects/star-system';
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
import { FleetRenderer } from './fleet-renderer';
import { Fleet } from '../game-objects/fleet';
import { MIN_ZOOM_TO_VIEW_PLANETS } from './galaxy-constants';

@Injectable({
  providedIn: 'root'
})
export class GalaxyMap {

  private gl: any;
  private animate: boolean;
  private starRenderer: StarRenderer;
  private planetRenderer: PlanetRenderer;
  private fleetRenderer: FleetRenderer;
  private camera: Camera;
  private hoverManager: HoverManager;
  private hoverHubRenderer: HoverHubRenderer;
  private _selected: number;
  private _mouseX: number;
  private _mouseY: number;
  private mouseDownX: number;
  private mouseDownY: number;
  private mouseDown: boolean;
  private mouseDownCameraX: number;
  private mouseDownCameraY: number;

  constructor(private core: CoreService, shaderCompiler: ShaderProgramCompiler, private store: Store) {
    this.camera = new Camera(store);
    this.animate = true;
    this.starRenderer = new StarRenderer(this.camera, shaderCompiler);
    this.planetRenderer = new PlanetRenderer(this.camera, shaderCompiler);
    this.fleetRenderer = new FleetRenderer(this.camera, shaderCompiler);
    this.hoverHubRenderer = new HoverHubRenderer(this.camera, shaderCompiler);
    this.hoverManager = new HoverManager(store, this.starRenderer, this.fleetRenderer, this.planetRenderer, this.camera);

    this.focusHome();
    core.getCurrentCivilization().subscribe((civ: UserCivilizationDTO) => {
      this.selectAndFocus(civ.homeworld.id);
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
    this.fleetRenderer.setup(gl);
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


    if (this.camera.zoom >= MIN_ZOOM_TO_VIEW_PLANETS) {
      this.planetRenderer.prepareRender(gl);
      this.store.planets.forEach(planet => {
          this.planetRenderer.render(gl, planet);
      });
    }


    this.fleetRenderer.prepareRender(gl);
    this.store.fleets.forEach(fleet => {
        this.fleetRenderer.render(gl, fleet);
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
      this.camera.follow(null);
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
    return this.store.getObjectById(this._selected);
  }

  mouseClick(): void {
    const dx = (this.mouseDownX - this._mouseX) * 100;
    const dy = (this.mouseDownY - this._mouseY) * 100;
    const epsilon = 2;
    const delta = dx * dx + dy * dy;
    if (delta > epsilon) {
      return;
    }
    if (this.hovered) {
      this.select(this.hovered.id);
    } else {
      this.select(null);
    }
  }

  onMouseDown(event: MouseEvent) {
    if (event.button === 2) {
      return;
    }
    this.mouseDown = true;
    this.mouseDownX = this._mouseX;
    this.mouseDownY = this._mouseY;
    this.mouseDownCameraX = this.camera.x;
    this.mouseDownCameraY = this.camera.y;

  }

  onMouseUp(event: MouseEvent) {
    this.mouseDown = false;
    if (event.button === 2) {
      if (this.selected && this.selected.objectType === 'Fleet') {
        if (this.hovered && this.hovered.objectType === 'StarSystem') {
          this.core.startTravel(this.selected as Fleet, this.hovered as StarSystem);
        }
      }
    }
  }

  deselect() {
    this._selected = null;
  }

  focusHome(): void {
    if (this.core.hasCivilization) {
      this.selectAndFocus(this.core.currentCivilization.homeworld.id);
    }
  }

  selectAndFocus(id: number) {
    const element = this.store.getObjectById(id);
    this.camera.x = element.x;
    this.camera.y = element.y;
    this.camera.zoom = 1;
    this._selected = element.id;
    this.camera.follow(element.id);
  }

  public select(id: number) {
    this.camera.follow(null);
    this._selected = id;
  }
}
