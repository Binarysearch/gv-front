import { GalaxyMap } from './../galaxy/galaxy-map';
import { TextService } from './../services/text.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { Colony } from '../game-objects/colony';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colonies',
  templateUrl: './colonies.component.html',
  styleUrls: ['./colonies.component.css']
})
export class ColoniesComponent implements OnInit {

  private _colonies: Colony[] = [];
  orderBy = 'civilizationId';
  orderDir = -1;

  constructor(private store: Store, public ts: TextService, private galaxyMap: GalaxyMap, private router: Router) { }

  ngOnInit() {

  }

  get colonies(): Colony[] {
    if (this._colonies.length !== this.store.colonies.length) {

      this._colonies = [];
      this.store.colonies.forEach(c => {
        this._colonies.push(c);
      });

      this._colonies.sort((c1, c2) => {
        return this.orderDir * (c1[this.orderBy] - c2[this.orderBy]);
      });
    }

    return this._colonies;
  }

  public sortBy(fieldName: string) {
    if (fieldName === this.orderBy) {
      this.orderDir *= -1;
    } else {
      this.orderBy = fieldName;
    }
    this._colonies = [];
  }

  public clickInColony(id: number) {
    this.galaxyMap.selectAndFocus(id);
    this.router.navigate(['galaxy']);
  }
}
