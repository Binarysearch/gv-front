import { Galaxy } from './galaxy';

export interface Session {
  token: string;
  user: {
    id: number,
    email: String,
    currentGalaxy?: Galaxy
  };
}
