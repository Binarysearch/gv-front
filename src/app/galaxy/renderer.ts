import { GameObject } from '../game-objects/game-object';

export interface Renderer {
    setup(gl: any): void;
    prepareRender(gl: any): void;
    render(gl: any, elem: GameObject): void;
    getElementRenderScale(element: GameObject): number;
}
