export interface Renderer {
    setup(): void;
    prepareRender(): void;
    render(elem: any): void;
}
