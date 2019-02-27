import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GalaxyMap } from './galaxy-map';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css'],
})
export class GalaxyComponent implements OnInit {

  @ViewChild('canvasRef') canvasRef: ElementRef;

  canvas: HTMLCanvasElement;

  constructor(public galaxyMap: GalaxyMap) {}

  ngOnInit() {
    this.canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
    const gl = this.canvas.getContext('webgl2');

    this.galaxyMap.setup(gl);

    this.onResize();
  }

  onScroll(event: WheelEvent) {
    this.galaxyMap.zoomEvent(event.deltaY);
    event.preventDefault();
  }

  @HostListener('window:wheel')
  cancelWindowWheel() {
    event.preventDefault();
  }

  @HostListener('window:mouseup')
  windowMouseUp() {
    this.galaxyMap.onMouseUp();
  }

  @HostListener('window:mousemove', ['$event'])
  windowMouseMove(event: MouseEvent) {
    const x = ((event.clientX - this.canvas.getBoundingClientRect().left) / this.canvas.width) * 2 - 1;
    const y = -(((event.clientY - this.canvas.getBoundingClientRect().top) / this.canvas.height) * 2 - 1);
    this.galaxyMap.mouseMoveOnWindow(x, y);
  }

  @HostListener('window:resize')
  onResize() {
    const displayWidth  = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    if (this.canvas.width  !== displayWidth || this.canvas.height !== displayHeight) {
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
    }

    this.galaxyMap.setViewport(this.canvas.width, this.canvas.height);
  }

  get hoveredTitle(): string {
    return this.galaxyMap.hovered.objectType + ' ' + this.galaxyMap.hovered.id;
  }

  mouseClick() {
    this.galaxyMap.mouseClick();
  }

  mouseDown() {
    this.galaxyMap.onMouseDown();
  }

  mouseUp() {
    this.galaxyMap.onMouseUp();
  }
}
