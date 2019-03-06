import { GameObject } from '../game-objects/game-object';

export interface PlanetDTO extends GameObject {
  id: number;
  starX: number;
  starY: number;
  type: number;
  size: number;
  orbit: number;
}
