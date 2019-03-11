import { Camera } from './camera';
import { Renderer } from './renderer';
import { ShaderProgramCompiler } from './gl/shader-program-compiler';
import { PLANET_VS_SOURCE, PLANET_FS_SOURCE } from './gl/shaders/planet-shader';
import { PLANET_COLORS, PLANET_RENDER_SCALE_ZD, PLANET_RENDER_SCALE_ZI, PLANET_RENDER_SCALE_ZI_SI } from './galaxy-constants';
import { Planet } from '../game-objects/planet';

export class PlanetRenderer implements Renderer {
  program: WebGLShader;
  vao: WebGLVertexArrayObjectOES;
  aspectUniformLocation: WebGLUniformLocation;
  scaleUniformLocation: WebGLUniformLocation;
  zoomUniformLocation: WebGLUniformLocation;
  positionUniformLocation: WebGLUniformLocation;
  starPositionUniformLocation: WebGLUniformLocation;
  colorUniformLocation: WebGLUniformLocation;

  constructor(private camera: Camera, private shaderCompiler: ShaderProgramCompiler) {}

  setup(gl: any) {
    this.program = this.shaderCompiler.createShaderProgram(gl, PLANET_VS_SOURCE, PLANET_FS_SOURCE);

    this.vao = (gl as any).createVertexArray();
    (gl as any).bindVertexArray(this.vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 0,  -1, -1, 0,  1, -1, 0,  1, 1, 0, -1, 1, 0, 1, -1, 0]), gl.STATIC_DRAW);

    const coord = gl.getAttribLocation(this.program, 'position');
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    this.aspectUniformLocation = gl.getUniformLocation(this.program, 'aspect');
    this.scaleUniformLocation = gl.getUniformLocation(this.program, 'scale');
    this.zoomUniformLocation = gl.getUniformLocation(this.program, 'zoom');
    this.positionUniformLocation = gl.getUniformLocation(this.program, 'pos');
    this.starPositionUniformLocation = gl.getUniformLocation(this.program, 'starPosition');
    this.colorUniformLocation = gl.getUniformLocation(this.program, 'color');
  }

  prepareRender(gl: any) {
    const zoom = this.camera.zoom;
    const aspect = this.camera.aspectRatio;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);


    gl.uniform1f(this.zoomUniformLocation, zoom);
    gl.uniform1f(this.aspectUniformLocation, aspect);
  }

  render(gl: any, planet: Planet) {
    const color = PLANET_COLORS[planet.type - 1];
    const angle = planet.angle;

    gl.uniform1f(this.scaleUniformLocation, this.getElementRenderScale(planet));
    gl.uniform2f(this.positionUniformLocation, planet.x - this.camera.x, planet.y - this.camera.y);
    gl.uniform2f(this.starPositionUniformLocation, -Math.cos(angle), -Math.sin(angle));
    gl.uniform3f(this.colorUniformLocation, color.r, color.g, color.b);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  getElementRenderScale(p: Planet): number {
    const zoom = this.camera.zoom;
    const scale = (PLANET_RENDER_SCALE_ZI * p.size * p.size + PLANET_RENDER_SCALE_ZI_SI)
      / zoom + (PLANET_RENDER_SCALE_ZD * p.size * p.size);
    return scale;
  }
}
