import { GalaxyDTO } from './galaxy';

export interface SessionDTO {
  token: string;
  user: {
    id: number,
    email: String,
    currentGalaxy?: GalaxyDTO
  };
}
