import { TextService } from './../services/text.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { PLANET_TYPES, PLANET_SIZES } from '../galaxy/galaxy-constants';
import { Planet } from '../game-objects/planet';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  private _planets: Planet[] = [];
  orderBy = 'type';
  orderDir = -1;

  constructor(private store: Store, public ts: TextService) { }

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

      this._planets.sort((p1, p2) => {
        return this.orderDir * (p1[this.orderBy] - p2[this.orderBy]);
      });
    }

    return this._planets;
  }

  public sortBy(fieldName: string) {
    if (fieldName === this.orderBy) {
      this.orderDir *= -1;
    } else {
      this.orderBy = fieldName;
    }
    this._planets = [];
  }
}
