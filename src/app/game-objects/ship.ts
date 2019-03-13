import { Fleet } from 'src/app/game-objects/fleet';
import { ShipDTO } from './../dtos/ship';
import { GameObject } from './game-object';

export class Ship implements GameObject {
  id: number;
  x: number;
  y: number;
  objectType: 'Ship';
  fleetId: number;
  fleet: Fleet;
  modelName: string;
  canColonize: boolean;
  canFight: boolean;

  constructor(data: ShipDTO) {
    this.id = data.id;
    this.fleetId = data.fleet;
    this.modelName = data.modelName;
    this.canColonize = data.canColonize;
    this.canFight = data.canFight;
  }
}
