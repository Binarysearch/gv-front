import { CivilizationDTO } from './../dtos/civilization';
import { GameObject } from './game-object';
import { Planet } from './planet';
import { Colony } from './colony';
import { Fleet } from './fleet';

export class Civilization implements GameObject {

  id: number;
  name: string;
  homeworld: Planet;
  homeworldId: number;
  colonies: Colony[] = [];
  fleets: Fleet[] = [];

  constructor(data: CivilizationDTO) {
    this.id = data.id;
    this.name = data.name;
    this.homeworldId = data.homeworld;
  }

  get objectType() { return 'Civilization'; }

  get x(): number {
    return null;
  }

  get y(): number {
    return null;
  }
}
