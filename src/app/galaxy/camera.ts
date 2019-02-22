
export class Camera {
    aspectRatio: number;
    zoom: number;
    x: number;
    y: number;

    constructor() {
      this.zoom = 0.00002;
      this.x = 50000;
      this.y = 50000;
    }
}
