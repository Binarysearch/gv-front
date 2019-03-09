import { GalaxyMap } from './../galaxy/galaxy-map';
import { TextService } from './../services/text.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { PLANET_TYPES, PLANET_SIZES } from '../galaxy/galaxy-constants';
import { Fleet } from '../game-objects/fleet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fleets',
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.css']
})
export class FleetsComponent implements OnInit {

  private _fleets: Fleet[] = [];
  orderBy = 'destinationId';
  orderDir = -1;

  constructor(private store: Store, public ts: TextService, private galaxyMap: GalaxyMap, private router: Router) { }

  ngOnInit() {

  }

  get fleets(): Fleet[] {
    if (this._fleets.length !== this.store.fleets.length) {

      this._fleets = [];
      this.store.fleets.forEach(f => {
        this._fleets.push(f);
      });

      this.sortFleets();
    }

    return this._fleets;
  }

  private sortFleets() {
    const sortFunc = (f1, f2) => {

      return this.orderDir * (f1[this.orderBy] - f2[this.orderBy]);
    };

    this._fleets.sort(sortFunc);
  }

  public sortBy(fieldName: string) {
    if (fieldName === this.orderBy) {
      this.orderDir *= -1;
    } else {
      this.orderBy = fieldName;
    }
    this._fleets = [];
  }

  public clickInFleet(id: number) {
    this.galaxyMap.selectAndFocus(id);
    this.router.navigate(['galaxy']);
  }

  getFleetLocation(fleet: Fleet) {
    if (fleet.origin) {
      return this.ts.strings.travellingFrom + ' ' +
          fleet.origin.name + this.ts.strings.to + ' ' + fleet.destination.name;
    } else {
      return this.ts.strings.orbiting + ' ' + fleet.destination.name;
    }
  }
}
