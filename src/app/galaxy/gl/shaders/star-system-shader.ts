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


export const STAR_SYSTEM_FS_SOURCE: string = `#version 300 es
precision mediump float;
out vec4 fragColor;
in vec3 coord;
in float z;
uniform vec3 color;
uniform vec3 civilizationColor;

uniform float time;
uniform float hover;

void main() {
    //fragColor = vec4(1.0);
    //return;
    float vC = min(coord.z/0.001,1.0);
    float l = length(coord.xy)/2.0;
    if(l > 0.5)
        discard;
    if(z<0.001){
        if(l > 0.4){
            discard;
        }else{
            float a = 1.0 - l*2.0;
            float f = 1.0 - l*3.5;
            float d = abs(a*a*a/(coord.x)) + abs(a*a*a/(coord.y));
        
        
            float s = f*f*f*f*f*10.0 + min(d/100.0,0.2);
            fragColor = vec4(s,s,s,(s + a/5.0)*a) + vec4(1.0,1.0,1.0,0.0);
            return;
        }
    }
    if(l>0.4){
        vec2 r = vec2(coord.x*cos(time),coord.y*sin(time));
        float a1 = max(vC*r.x+vC*r.y,0.0) + max(-vC*r.x-vC*r.y,0.0);
        
        float fd = (0.5 - l)*10.0;
        fragColor = vec4(civilizationColor,a1 * fd)*hover;
    }else if(l > 0.5){
        discard;
    }else{
        float cambio = max(cos(-time+l*80.0),0.0)*hover;
        float a = 1.0 - l*2.0;
        float f = 1.0 - l*3.5;
        float d = abs(a*a*a/(coord.x)) + abs(a*a*a/(coord.y));
        
        
        float s = f*f*f*f*f*10.0 + min(d/100.0,0.2);
        fragColor = vec4(s,s,s,(s + cambio*a/5.0 + a/5.0)*a) + mix(vec4(color,0.0),vec4(1.0,1.0,1.0,0.0),(1.0-vC*0.8));
    }
}
`;