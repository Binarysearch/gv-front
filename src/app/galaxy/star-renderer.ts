import { Camera } from './camera';
import { Renderer } from './renderer';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { STAR_SYSTEM_VS_SOURCE, STAR_SYSTEM_FS_SOURCE } from './gl/shaders/star-system-shader';
import { STAR_COLORS, STAR_RENDER_SCALE_ZD, STAR_RENDER_SCALE_ZI_SI, STAR_RENDER_SCALE_ZI } from './galaxy-constants';
import { StarSystem } from '../game-objects/star-system';

export class StarRenderer implements Renderer {
  program: WebGLShader;
  vao: WebGLVertexArrayObjectOES;
  timeUniformLocation: WebGLUniformLocation;
  aspectUniformLocation: WebGLUniformLocation;
  scaleUniformLocation: WebGLUniformLocation;
  zoomUniformLocation: WebGLUniformLocation;
  positionUniformLocation: WebGLUniformLocation;
  colorUniformLocation: WebGLUniformLocation;

  constructor(private camera: Camera, private shaderCompiler: ShaderProgramCompiler) {}

  setup(gl: any) {
    this.program = this.shaderCompiler.createShaderProgram(gl, STAR_SYSTEM_VS_SOURCE, STAR_SYSTEM_FS_SOURCE);

    this.vao = (gl as any).createVertexArray();
    (gl as any).bindVertexArray(this.vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 0,  -1, -1, 0,  1, -1, 0,  1, 1, 0, -1, 1, 0, 1, -1, 0]), gl.STATIC_DRAW);

    const coord = gl.getAttribLocation(this.program, 'position');
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    this.timeUniformLocation = gl.getUniformLocation(this.program, 'time');
    this.aspectUniformLocation = gl.getUniformLocation(this.program, 'aspect');
    this.scaleUniformLocation = gl.getUniformLocation(this.program, 'scale');
    this.zoomUniformLocation = gl.getUniformLocation(this.program, 'zoom');
    this.positionUniformLocation = gl.getUniformLocation(this.program, 'pos');
    this.colorUniformLocation = gl.getUniformLocation(this.program, 'color');
  }

  prepareRender(gl: any) {
    const zoom = this.camera.zoom;
    const aspect = this.camera.aspectRatio;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    const time = (656454 % (Math.PI * 2000)) * 0.001;

    gl.uniform1f(this.timeUniformLocation, time);
    gl.uniform1f(this.zoomUniformLocation, zoom);
    gl.uniform1f(this.aspectUniformLocation, aspect);
  }

  render(gl: any, star: StarSystem) {

    const color = STAR_COLORS[star.type - 1];

    gl.uniform1f(this.scaleUniformLocation, this.getElementRenderScale(star));
    gl.uniform2f(this.positionUniformLocation, star.x - this.camera.x, star.y - this.camera.y);
    gl.uniform3f(this.colorUniformLocation, color.r, color.g, color.b);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  getElementRenderScale(ss: StarSystem): number {
    const zoom = this.camera.zoom;
    const scale = (STAR_RENDER_SCALE_ZI * ss.size * ss.size + STAR_RENDER_SCALE_ZI_SI) / zoom + STAR_RENDER_SCALE_ZD;
    return scale;
  }
}
