import { GameObject } from '../game-objects/game-object';

export interface StarSystemDTO extends GameObject {
  id: number;
  name?: string;
  x: number;
  y: number;
  type: number;
  size: number;
}
