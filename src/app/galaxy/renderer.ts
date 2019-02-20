export interface Renderer {
    setup(gl: any): void;
    prepareRender(gl: any): void;
    render(gl:any, elem: any): void;
}
