import { Store } from './../store';
import { StarRenderer } from './star-renderer';
import { Camera } from './camera';
import { Renderer } from './renderer';
import { GameObject } from '../game-objects/game-object';
import { PlanetRenderer } from './planet-renderer';
import { FleetRenderer } from './fleet-renderer';
import { MIN_ZOOM_TO_VIEW_PLANETS } from './galaxy-constants';

interface IntersectingElement {
  x: number;
  y: number;
  element: GameObject;
}

export class HoverManager {

  private _hovered: GameObject;

  constructor(private store: Store, private starRenderer: StarRenderer, private fleetRenderer: FleetRenderer,
     private planetRenderer: PlanetRenderer, private camera: Camera) {

  }

  public get hovered(): GameObject {
    return this._hovered;
  }


  mouseMoved(x: number, y: number): void {
    const intersectingStars = this.getintersectingStars(x, y);
    const intersectingPlanets = this.getintersectingPlanets(x, y);
    const intersectingFleets = this.getintersectingFleets(x, y);

    const closest = this.getClosestElement(x, y, [intersectingStars, intersectingPlanets, intersectingFleets]);

    this._hovered = closest;
  }

  getClosestElement(x: number, y: number, elements: IntersectingElement[][]): GameObject {
    let minDist = 10000000;
    let closest = null;
    elements.forEach( e => {
      e.forEach(s => {
        const xx = s.x * this.camera.zoom / this.camera.aspectRatio - x;
        const yy = s.y * this.camera.zoom - y;
        const dist = Math.sqrt(xx * xx + yy * yy);
        if (dist < minDist) {
          minDist = dist;
          closest = s.element;
        }
      });
    });

    return closest;
  }

  getintersectingStars(x: number, y: number) {
    return this.getIntersectingElements(x, y, this.store.starSystems, this.starRenderer);
  }

  getintersectingPlanets(x: number, y: number) {
    if (this.camera.zoom < MIN_ZOOM_TO_VIEW_PLANETS) {
      return [];
    }
    return this.getIntersectingElements(x, y, this.store.planets, this.planetRenderer);
  }

  getintersectingFleets(x: number, y: number) {
    return this.getIntersectingElements(x, y, this.store.fleets, this.fleetRenderer);
  }

  getIntersectingElements(x: number, y: number, elements: GameObject[], renderer: Renderer): IntersectingElement[] {
    const intersectingElements = [];

    elements.forEach(ss => {

      const scale = renderer.getElementRenderScale(ss);
      const cx = ss.x - this.camera.x;
      const cy = ss.y - this.camera.y;
      const left = (cx - scale) * this.camera.zoom / this.camera.aspectRatio;
      const right = (cx + scale) * this.camera.zoom / this.camera.aspectRatio;
      const bottom = (cy - scale) * this.camera.zoom;
      const top = (cy + scale) * this.camera.zoom;

      if (x > left && x < right && y > bottom && y < top) {
        intersectingElements.push({element: ss, x: cx, y: cy});
      }
    });
    return intersectingElements;
  }

}
