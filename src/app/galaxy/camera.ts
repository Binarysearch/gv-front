
const MIN_ZOOM = 0.00001;
const MAX_ZOOM = 0.0001;

export class Camera {
    private _aspectRatio: number;
    private _zoom: number;
    private _vZoom: number;
    private _x: number;
    private _y: number;

  constructor() {
    this._zoom = 0.00002;
    this._vZoom = 0;
    this._x = 50000;
    this._y = 50000;
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

  set aspectRatio(aspectRatio: number){
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
    this._zoom = Math.min(Math.max(this._zoom + this._vZoom, MIN_ZOOM), MAX_ZOOM);
    this._vZoom *= 0.9;

  }
}
