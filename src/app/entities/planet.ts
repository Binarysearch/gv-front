import { GameObject } from './game-object';

export interface Planet extends GameObject {
  id: number;
  starX: number;
  starY: number;
  type: number;
  size: number;
  orbit: number;
}
