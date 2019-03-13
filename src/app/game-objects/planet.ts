import { StarSystem } from './star-system';
import { GameObject } from './game-object';
import { PlanetDTO } from '../dtos/planet';
import { PLANET_ROTATION_SPEED_MULT, PLANET_ORBIT_SCALE_MULTIPLIER } from '../galaxy/galaxy-constants';
import { Colony } from './colony';

export class Planet implements GameObject {
  id: number;
  starSystemId: number;
  type: number;
  size: number;
  orbit: number;
  starSystem: StarSystem;
  colony: Colony;

  constructor (data: PlanetDTO) {
    this.id = data.id;
    this.starSystemId = data.starSystem;
    this.orbit = data.orbit;
    this.type = data.type;
    this.size = data.size;
  }

  get objectType() { return 'Planet'; }

  get x(): number {
    return Math.cos(this.angle) * this.orbit * PLANET_ORBIT_SCALE_MULTIPLIER + this.starSystem.x;
  }

  get y(): number {
    return Math.sin(this.angle) * this.orbit * PLANET_ORBIT_SCALE_MULTIPLIER + this.starSystem.y;
  }

  get angle(): number {
    const startingAngle = (this.id * this.id) % (Math.PI * 2);
    const time = new Date().getTime() * 0.001;
    const speed = PLANET_ROTATION_SPEED_MULT / Math.sqrt(this.orbit);
    return (startingAngle + speed * time) % (Math.PI * 2);
  }
}
