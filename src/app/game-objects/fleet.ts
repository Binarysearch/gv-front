import { FleetDTO } from './../dtos/fleet';
import { GameObject } from './game-object';
import { StarSystem } from './star-system';
import { Civilization } from './civilization';
import { FLEET_ROTATION_SPEED_MULT } from '../galaxy/galaxy-constants';

export class Fleet implements GameObject {

  id: number;
  civilization: Civilization;
  destination: StarSystem;
  origin: StarSystem;
  civilizationId: number;
  destinationId: number;
  originId: number;
  travelStartedTime: number;
  orbit = 7;

  constructor(data: FleetDTO) {
    this.id = data.id;
    this.destinationId = data.destination;
    this.originId = data.origin;
    this.civilizationId = data.civilization;
    this.travelStartedTime = data.travelStartedTime;
  }

  get objectType() { return 'Fleet'; }

  get x(): number {
    return Math.cos(this.angle) * this.orbit * 0.01 + this.destination.x;
  }

  get y(): number {
    return Math.sin(this.angle) * this.orbit * 0.01 + this.destination.y;
  }

  get angle(): number {
    const startingAngle = (this.id * this.id) % (Math.PI * 2);
    const time = new Date().getTime() * 0.001;
    const speed = FLEET_ROTATION_SPEED_MULT / Math.sqrt(this.orbit);
    return (startingAngle + speed * time) % (Math.PI * 2);
  }
}
