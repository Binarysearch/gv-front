import { GameObject } from './../game-objects/game-object';
import { Store } from './../store';

const MIN_ZOOM = 0.00002;
const MAX_ZOOM = 20;

const MIN_X = -60000;
const MAX_X = 60000;

const MIN_Y = -60000;
const MAX_Y = 60000;

const SPEED = 0.02;

export class Camera {
  private _aspectRatio: number;
  private _zoom: number;
  private _vZoom: number;

  private _x: number;
  private _y: number;

  private _speedX: number;
  private _speedY: number;

  private _movingLeft: boolean;
  private _movingRight: boolean;
  private _movingUp: boolean;
  private _movingDown: boolean;
  cX: number;
  cY: number;
  following: GameObject;

  constructor(private store: Store) {
    this._zoom = 0.00002;
    this._vZoom = 0;

    this._x = 0;
    this._y = 0;
    this._speedX = 0;
    this._speedY = 0;
    this.cX = 0;
    this.cY = 0;

  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x: number) {
    this._x = x;
  }

  set y(y: number) {
    this._y = y;
  }

  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom() {
    return this._zoom;
  }

  set aspectRatio(aspectRatio: number) {
    this._aspectRatio = aspectRatio;
  }

  get aspectRatio() {
    return this._aspectRatio;
  }

  public zoomIn(x: number, y: number) {
    this.setZoomCenter(x, y);
    this._vZoom += 0.02 * this._zoom;
  }

  setZoomCenter(x: number, y: number): any {
    this.cX = x;
    this.cY = y;
  }

  public zoomOut(x: number, y: number) {
    this.setZoomCenter(x, y);
    this._vZoom -= 0.02 * this._zoom;
  }

  public update() {

    if (this.following && this.following.x) {
      this._x = this.following.x;
    }
    if (this.following && this.following.y) {
      this._y = this.following.y;
    }

    if (this._movingLeft) {
      this._speedX = -SPEED / this._zoom;
    }

    if (this._movingRight) {
      this._speedX = SPEED / this.zoom;
    }

    if (this._movingUp) {
      this._speedY = SPEED / this.zoom;
    }

    if (this._movingDown) {
      this._speedY = -SPEED / this.zoom;
    }

    let offsetX = 0;
    let offsetY = 0;
    const newZoom = Math.min(Math.max(this._zoom + this._vZoom, MIN_ZOOM), MAX_ZOOM);

    if (this.cX !== 0) {
      const oldZoom = this._zoom;
      const zoomChange = oldZoom / newZoom;
      offsetX = -(zoomChange * (this.cX - this.x) - this.cX + this.x);
      offsetY = -(zoomChange * (this.cY - this.y) - this.cY + this.y);
    }

    this._zoom = newZoom;
    this._vZoom *= 0.9;

    this._x = Math.min(Math.max(this._x + this._speedX + offsetX, MIN_X), MAX_X);
    this._y = Math.min(Math.max(this._y + this._speedY + offsetY, MIN_Y), MAX_Y);

    this._speedX *= 0.95;
    this._speedY *= 0.95;

  }

  mouseMoved(x: number, y: number): void {
    if (x < 0.01) {
      this._movingLeft = true;
    } else if (x > 0.99) {
      this._movingRight = true;
    } else {
      this._movingLeft = false;
      this._movingRight = false;
    }

    if (y < 0.01) {
      this._movingUp = true;
    } else if (y > 0.99) {
      this._movingDown = true;
    } else {
      this._movingDown = false;
      this._movingUp = false;
    }
  }

  stopMoving(): void {
    this._movingLeft = false;
    this._movingRight = false;
    this._movingDown = false;
    this._movingUp = false;
  }

  follow(id: number): any {
    this.following = this.store.getObjectById(id);
  }
}
