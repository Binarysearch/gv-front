

export interface UserCivilizationDTO {
  id: number;
  name: string;
  serverTime: number;
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
