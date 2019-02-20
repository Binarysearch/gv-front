import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalaxyRenderer } from './galaxy-renderer';
import { Camera } from './camera';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class GalaxyComponent implements OnInit {

  @ViewChild("canvasRef") canvasRef: ElementRef;

  canvas: HTMLCanvasElement;
  
  constructor(private renderer: GalaxyRenderer, private camera: Camera) { }

  ngOnInit() {
    this.canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
    let context = this.canvas.getContext('webgl2');
    this.camera.gl = context;
    this.camera.gl.clearColor(0, 0, 0, 1);

    let animate = () => {
        window.requestAnimationFrame(animate);
        this.renderer.render();
    };
    animate();
    this.onResize();
    this.renderer.setup();
  }

  onResize() {
    var displayWidth  = this.canvas.clientWidth;
    var displayHeight = this.canvas.clientHeight;

    if (this.canvas.width  != displayWidth || this.canvas.height != displayHeight) {
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
    }
    this.camera.aspectRatio = this.canvas.width/this.canvas.height;
    this.camera.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
