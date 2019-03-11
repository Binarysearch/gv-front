import { Fleet } from './fleet';
import { StarSystemDTO } from './../dtos/star-system';
import { GameObject } from './game-object';
import { Planet } from './planet';

export class StarSystem implements GameObject {
  id: number;
  name?: string;
  x: number;
  y: number;
  type: number;
  size: number;
  planets: Planet[] = [];
  fleets: Fleet[] = [];

  constructor (data: StarSystemDTO) {
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.type = data.type;
    this.size = data.size;
  }

  get objectType() { return 'StarSystem'; }


}
