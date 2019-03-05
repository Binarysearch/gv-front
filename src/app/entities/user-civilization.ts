

export interface UserCivilization {
  id: number;
  name: string;
  homeworld: {
    id: number;
    orbit: number;
    type: number;
    size: number;
    starSystem: {
      id: number;
      name: string;
      x: number;
      y: number;
      type: number;
      size: number;
    };
  };
}
