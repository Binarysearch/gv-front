import { GalaxyMap } from './../../galaxy-map';
import { Planet } from './../../../game-objects/planet';
import { TextService } from './../../../services/text.service';
import { Component, OnInit, Input } from '@angular/core';
import { StarSystem } from 'src/app/game-objects/star-system';

@Component({
  selector: 'app-star-planets',
  templateUrl: './star-planets.component.html',
  styleUrls: ['./star-planets.component.css']
})
export class StarPlanetsComponent implements OnInit {

  @Input() starSystem: StarSystem;


  constructor(public ts: TextService, private map: GalaxyMap) { }

  ngOnInit() {
  }

  getPlanetDescription(planet: Planet) {
    return this.ts.strings.orbit + ' ' + planet.orbit;
  }

  selectPlanet(planet: Planet) {
    this.map.select(planet.id);
  }
}
