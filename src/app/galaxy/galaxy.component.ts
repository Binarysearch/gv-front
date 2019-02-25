import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GalaxyRenderer } from './galaxy-renderer';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css'],
})
export class GalaxyComponent implements OnInit {

  @ViewChild('canvasRef') canvasRef: ElementRef;

  canvas: HTMLCanvasElement;

  constructor(private renderer: GalaxyRenderer) {}

  ngOnInit() {
    this.canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
    const gl = this.canvas.getContext('webgl2');

    this.renderer.setup(gl);

    this.onResize();
  }

  onScroll(event: WheelEvent) {
    this.renderer.zoomEvent(event.deltaY);
    event.preventDefault();
  }

  mouseMove(event: MouseEvent) {
    const x = ((event.clientX - this.canvas.getBoundingClientRect().left) / this.canvas.width) * 2 - 1;
    const y = -(((event.clientY - this.canvas.getBoundingClientRect().top) / this.canvas.height) * 2 - 1);
    this.renderer.mouseMoveEvent(x, y);
  }

  mouseOut() {
    this.renderer.mouseOut();
  }

  @HostListener('window:wheel')
  cancelWindowWheel() {
    event.preventDefault();
  }

  @HostListener('window:resize')
  onResize() {
    const displayWidth  = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    if (this.canvas.width  !== displayWidth || this.canvas.height !== displayHeight) {
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
    }

    this.renderer.setViewport(this.canvas.width, this.canvas.height);
  }

}
