
const MIN_ZOOM = 0.00001;
const MAX_ZOOM = 0.0001;

const MIN_X = 0;
const MAX_X = 100000;

const MIN_Y = 0;
const MAX_Y = 100000;

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

  constructor() {
    this._zoom = 0.00002;
    this._vZoom = 0;

    this._x = 50000;
    this._y = 50000;
    this._speedX = 0;
    this._speedY = 0;

  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
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

  public zoomIn() {
    this._vZoom += 0.02 * this._zoom;
  }

  public zoomOut() {
    this._vZoom -= 0.02 * this._zoom;
  }

  public update() {

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

    this._zoom = Math.min(Math.max(this._zoom + this._vZoom, MIN_ZOOM), MAX_ZOOM);
    this._vZoom *= 0.9;

    this._x = Math.min(Math.max(this._x + this._speedX, MIN_X), MAX_X);
    this._y = Math.min(Math.max(this._y + this._speedY, MIN_Y), MAX_Y);

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
}
