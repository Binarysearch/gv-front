import { GalaxyMap } from './../../galaxy-map';
import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/app/game-objects/planet';
import { TextService } from 'src/app/services/text.service';
import { PLANET_TYPES, PLANET_SIZES } from '../../galaxy-constants';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  @Input() planet: Planet;

  constructor(public ts: TextService, private map: GalaxyMap) { }

  ngOnInit() {
  }

  get planetType() {
    return PLANET_TYPES[this.planet.type - 1];
  }

  get planetSize() {
    return PLANET_SIZES[this.planet.size - 1];
  }

  get starSystemName() {
    if (this.planet.starSystem.name) {
      return this.planet.starSystem.name;
    }
    return this.ts.strings.starSystem + ' ' + this.planet.starSystem.id;
  }

  clickStarSystem() {
    this.map.select(this.planet.starSystem.id);
  }
}
