import { GameObject } from './game-object';

export interface StarSystem extends GameObject {
  id: number;
  name?: string;
  x: number;
  y: number;
  type: number;
  size: number;
}
