import { PlanetDTO } from './planet';


export interface UserCivilizationDTO {
  id: number;
  name: string;
  serverTime: number;
  homeworld: PlanetDTO;
}
