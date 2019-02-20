import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalaxyRenderer } from './galaxy-renderer';

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
  
  constructor(private renderer: GalaxyRenderer) {}

  ngOnInit() {
    this.canvas = (this.canvasRef.nativeElement as HTMLCanvasElement);
    let gl = this.canvas.getContext('webgl2');
    
    this.renderer.setup(gl);
    
    this.onResize();
  }

  onResize() {
    var displayWidth  = this.canvas.clientWidth;
    var displayHeight = this.canvas.clientHeight;

    if (this.canvas.width  != displayWidth || this.canvas.height != displayHeight) {
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
    }
    
    this.renderer.setViewport(this.canvas.width, this.canvas.height);
  }
}
