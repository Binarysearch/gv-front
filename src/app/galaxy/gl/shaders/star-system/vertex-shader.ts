export const STAR_SYSTEM_VS_SOURCE: string = `#version 300 es
            
in vec2 position;

uniform vec2 pos;
uniform float scale;
uniform float zoom;
uniform float aspect;

out vec3 coord;
out float z;

void main() {
    vec2 p = position*scale + pos;
    p.x /= aspect;
    coord = vec3(position,zoom);
    z = zoom;
    gl_Position = vec4(p*zoom, 0.0, 1.0);
}
`;