import { StarRenderer } from './star-renderer';
import { CoreService } from './../services/core.service';
import { Camera } from './camera';
import { Renderer } from './renderer';
import { GameObject } from '../game-objects/game-object';

interface IntersectingElement {
  x: number;
  y: number;
  element: GameObject;
}

export class HoverManager {

  private _hovered: GameObject;

  constructor(private core: CoreService, private starRenderer: StarRenderer, private camera: Camera) {

  }

  public get hovered(): GameObject {
    return this._hovered;
  }


  mouseMoved(x: number, y: number): void {
    const intersectingStars = this.getintersectingStars(x, y);

    const closest = this.getClosestElement(x, y, [intersectingStars]);

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
    return this.getIntersectingElements(x, y, this.core.starSystems, this.starRenderer);
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
