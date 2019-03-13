import { Store } from './../store';
import { CoreService } from './../services/core.service';
import { FleetDTO } from './../dtos/fleet';
import { GameObject } from './game-object';
import { StarSystem } from './star-system';
import { Civilization } from './civilization';
import { FLEET_ROTATION_SPEED_MULT } from '../galaxy/galaxy-constants';
import { Ship } from './ship';

export class Fleet implements GameObject {

  id: number;
  civilization: Civilization;
  destination: StarSystem;
  origin: StarSystem;
  ships: Ship[];
  civilizationId: number;
  destinationId: number;
  originId: number;
  travelStartTime: number;
  orbit = 7;
  speed = 1;
  store: Store;

  constructor(data: FleetDTO) {
    this.id = data.id;
    this.destinationId = data.destination;
    this.originId = data.origin;
    this.civilizationId = data.civilization;
    this.travelStartTime = data.travelStartTime;
  }

  get objectType() { return 'Fleet'; }

  get x(): number {
    let travelX = this.destination.x;
    if (this.isTravelling) {
      const p = this.travelPercent;
      travelX = this.origin.x * (1 - p) + this.destination.x * p;
    }

    return Math.cos(this.angle) * this.orbit * 0.01 + travelX;
  }

  get y(): number {
    let travelY = this.destination.y;
    if (this.isTravelling) {
      const p = this.travelPercent;
      travelY = this.origin.y * (1 - p) + this.destination.y * p;
    }

    return Math.sin(this.angle) * this.orbit * 0.01 + travelY;
  }

  get travelDistance() {
    const x = this.destination.x - this.origin.x;
    const y = this.destination.y - this.origin.y;
    return Math.sqrt(x * x + y * y);
  }

  get angle(): number {
    if (this.isTravelling) {
      return Math.atan2(this.origin.y - this.destination.y, this.origin.x - this.destination.x) + Math.PI / 2;
    }
    const startingAngle = (this.id * this.id) % (Math.PI * 2);
    const time = new Date().getTime() * 0.001;
    const speed = FLEET_ROTATION_SPEED_MULT / Math.sqrt(this.orbit);
    return ((startingAngle + speed * time) % (Math.PI * 2));
  }

  get travelPercent() {
    if (this.destinationId !== this.originId) {

      const travelTime = this.travelDistance / this.speed;
      const timeElapsed = this.store.gameTime - this.travelStartTime;
      const remainingTime = travelTime - timeElapsed;
      return 1 - Math.max(Math.min(remainingTime / travelTime, 1), 0);
    }
    return 1;
  }

  get isTravelling(): boolean {
    return this.destinationId !== this.originId && this.travelPercent < 1;
  }
}
