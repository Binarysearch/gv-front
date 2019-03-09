import { GalaxyMap } from './../galaxy/galaxy-map';
import { TextService } from './../services/text.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { PLANET_TYPES, PLANET_SIZES } from '../galaxy/galaxy-constants';
import { Planet } from '../game-objects/planet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  private _planets: Planet[] = [];
  orderBy = 'type';
  orderDir = -1;

  constructor(private store: Store, public ts: TextService, private galaxyMap: GalaxyMap, private router: Router) { }

  ngOnInit() {

  }

  planetTypeName(type: number) {
    return PLANET_TYPES[type - 1];
  }

  planetSizeName(size: number) {
    return PLANET_SIZES[size - 1];
  }

  get planets(): Planet[] {
    if (this._planets.length !== this.store.planets.length) {

      this._planets = [];
      this.store.planets.forEach(p => {
        this._planets.push(p);
      });

      this.sortPlanets();
    }

    return this._planets;
  }

  private sortPlanets() {
    let sortFunc = (p1, p2) => {

      return this.orderDir * (p1[this.orderBy] - p2[this.orderBy]);
    };

    if (this.orderBy === 'colonizedBy') {
      sortFunc = (p1: Planet, p2: Planet) => {
        const n1 = p1.colony ? 1 : 0;
        const n2 = p2.colony ? 1 : 0;
        return this.orderDir * (n1 - n2);
      };
    }

    this._planets.sort(sortFunc);
  }

  public sortBy(fieldName: string) {
    if (fieldName === this.orderBy) {
      this.orderDir *= -1;
    } else {
      this.orderBy = fieldName;
    }
    this._planets = [];
  }

  public clickInPlanet(id: number) {
    this.galaxyMap.selectAndFocus(id);
    this.router.navigate(['galaxy']);
  }

  colonizedBy(planet: Planet): string {
    if (planet.colony) {
      return planet.colony.civilization.name;
    }
    return this.ts.strings.na;
  }
}
