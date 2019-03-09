import { Civilization } from './../game-objects/civilization';
import { GalaxyMap } from './../galaxy/galaxy-map';
import { TextService } from './../services/text.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-civilizations',
  templateUrl: './civilizations.component.html',
  styleUrls: ['./civilizations.component.css']
})
export class CivilizationsComponent implements OnInit {

  private _civilizations: Civilization[] = [];
  orderBy = 'name';
  orderDir = -1;

  constructor(private store: Store, public ts: TextService, private galaxyMap: GalaxyMap, private router: Router) { }

  ngOnInit() {

  }

  get civilizations(): Civilization[] {
    if (this._civilizations.length !== this.store.civilizations.length) {

      this._civilizations = [];
      this.store.civilizations.forEach(c => {
        this._civilizations.push(c);
      });

      this._civilizations.sort((c1, c2) => {
        return this.orderDir * (c1[this.orderBy] - c2[this.orderBy]);
      });
    }

    return this._civilizations;
  }

  public sortBy(fieldName: string) {
    if (fieldName === this.orderBy) {
      this.orderDir *= -1;
    } else {
      this.orderBy = fieldName;
    }
    this._civilizations = [];
  }

  public clickInCivilization(id: number) {
    console.log('Clicked civilization ' + id);
  }

  homeworldName(civ: Civilization) {
    if (civ.homeworld) {
      return civ.homeworld.starSystem.name + ' - ' + civ.homeworld.orbit + 'º';
    }
    return this.ts.strings.unknown;
  }
}
