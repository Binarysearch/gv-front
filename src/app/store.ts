import { GameObject } from './game-objects/game-object';
import { Injectable } from '@angular/core';
import { StarSystem } from './game-objects/star-system';
import { Planet } from './game-objects/planet';
import { Colony } from './game-objects/colony';
import { Civilization } from './game-objects/civilization';

@Injectable({
  providedIn: 'root'
})
export class Store {

  private objects: Map<number, GameObject> = new Map();

  private _starSystems: StarSystem[] = [];
  private _planets: Planet[] = [];
  private _civilizations: Civilization[] = [];
  private _colonies: Colony[] = [];

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

  public get colonies(): Colony[] {
    return this._colonies;
  }

  public addPlanet(planet: Planet): void {
    planet.starSystem = this.objects.get(planet.starSystemId) as StarSystem;
    this.objects.set(planet.id, planet);
    this._planets.push(planet);
  }

  addCivilization(civilization: Civilization): any {
    civilization.homeworld = this.objects.get(civilization.homeworldId) as Planet;
    this.objects.set(civilization.id, civilization);
    this._civilizations.push(civilization);
  }

  addColony(colony: Colony): any {
    colony.planet = this.objects.get(colony.planetId) as Planet;
    colony.planet.colony = colony;
    colony.civilization = this.objects.get(colony.civilizationId) as Civilization;
    this.objects.set(colony.id, colony);
    this._colonies.push(colony);
  }

  public clear(): void {
    this.objects.clear();
    this._planets = [];
    this._civilizations = [];
    this._colonies = [];
    this._starSystems = [];
  }

  getObjectById(id: number) {
    return this.objects.get(id);
  }

}
