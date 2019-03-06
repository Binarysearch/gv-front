import { GameObject } from './game-objects/game-object';
import { Injectable } from '@angular/core';
import { StarSystem } from './game-objects/star-system';
import { Planet } from './game-objects/planet';

@Injectable({
  providedIn: 'root'
})
export class Store {

  private objects: Map<number, GameObject> = new Map();

  private _starSystems: StarSystem[] = [];
  private _planets: Planet[] = [];

  public get starSystems(): StarSystem[] {
    return this._starSystems;
  }

  public addStarSystem(starSystem: StarSystem): void {
    this.objects.set(starSystem.id, starSystem);
    this._starSystems.push(starSystem);
  }

  public get planets(): Planet[] {
    return this._planets;
  }

  public addPlanet(planet: Planet): void {
    planet.starSystem = this.objects.get(planet.starSystemId) as StarSystem;
    this.objects.set(planet.id, planet);
    this._planets.push(planet);
  }

  public clear(): void {
    this.objects.clear();
    this._planets = [];
    this._starSystems = [];
  }

}
