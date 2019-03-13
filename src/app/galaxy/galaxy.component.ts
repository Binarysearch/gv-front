import { CoreService } from './../services/core.service';
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

  constructor(public galaxyMap: GalaxyMap, private core: CoreService) {}

  ngOnInit() {
    this.canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
    const gl = this.canvas.getContext('webgl2');

    this.galaxyMap.setup(gl);

    this.onResize();
    this.cancelWindowWheel();
  }

  onScroll(event: WheelEvent) {
    this.galaxyMap.zoomEvent(event.deltaY);
    event.preventDefault();
  }

  cancelWindowWheel() {
    /*window.addEventListener('wheel', function(e) {
      e.preventDefault();
    }, {
      passive: false
    });*/
  }

  cancelContextMenu(event) {
    event.preventDefault();
  }

  @HostListener('window:mouseup', ['$event'])
  windowMouseUp(event: MouseEvent) {
    this.galaxyMap.onMouseUp(event);
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

  @HostListener('window:keydown.control.h', ['$event'])
  focusHome(event: KeyboardEvent) {
    this.galaxyMap.focusHome();
    event.preventDefault();
  }

  get hoveredTitle(): string {
    return this.galaxyMap.hovered.objectType + ' ' + this.galaxyMap.hovered.id;
  }

  mouseClick() {
    this.galaxyMap.mouseClick();
  }

  mouseDown(event: MouseEvent) {
    this.galaxyMap.onMouseDown(event);
  }

  public get createCivilizationWindowVisible(): boolean {
    return !this.core.hasCivilization;
  }
}
