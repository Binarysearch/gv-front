import { Fleet } from './../../../game-objects/fleet';
import { GalaxyMap } from './../../galaxy-map';
import { TextService } from './../../../services/text.service';
import { Component, OnInit, Input } from '@angular/core';
import { StarSystem } from 'src/app/game-objects/star-system';

@Component({
  selector: 'app-star-fleets',
  templateUrl: './star-fleets.component.html',
  styleUrls: ['./star-fleets.component.css']
})
export class StarFleetsComponent implements OnInit {

  @Input() starSystem: StarSystem;

  constructor(public ts: TextService, private map: GalaxyMap) { }

  ngOnInit() {
  }

  getFleetDescription(fleet: Fleet) {
    return this.ts.strings.fleet + ' ' + fleet.id;
  }

  selectFleet(fleet: Fleet) {
    this.map.select(fleet.id);
  }

}
