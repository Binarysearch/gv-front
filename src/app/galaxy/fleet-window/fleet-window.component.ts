import { Planet } from './../../game-objects/planet';
import { TextService } from './../../services/text.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GalaxyMap } from '../galaxy-map';
import { Fleet } from 'src/app/game-objects/fleet';

@Component({
  selector: 'app-fleet-window',
  templateUrl: './fleet-window.component.html',
  styleUrls: ['./fleet-window.component.css']
})
export class FleetWindowComponent implements OnInit {

  @Input() fleet: Fleet;
  @Output() closeButton = new EventEmitter();
  maximized = false;

  constructor(private map: GalaxyMap, public ts: TextService) { }

  ngOnInit() {
    const statusString = localStorage.getItem('fleet-window-status');
    if (statusString) {
      const status = JSON.parse(statusString);
      this.maximized = status.maximized;
    }
  }

  get title(): string {
    return this.ts.strings.fleet + ' ' + this.fleet.id;
  }

  closeButtonClick() {
    this.closeButton.emit();
  }

  maximizeButtonClick() {
    this.maximized = true;
    this.storeStatus();
  }

  restoreButtonClick() {
    this.maximized = false;
    this.storeStatus();
  }

  storeStatus() {
    const status = {
      maximized: this.maximized,
    };
    localStorage.setItem('fleet-window-status', JSON.stringify(status));
  }

  previousFleet() {
    let idx = -1;
    this.fleet.destination.fleets.find((f, i) => {
      idx = i;
      return this.fleet === f;
    });
    const prev = this.fleet.destination.fleets[(idx + this.fleet.destination.fleets.length - 1) % this.fleet.destination.fleets.length];
    this.map.selectAndFocus(prev.id);
  }

  nextFleet() {
    let idx = -1;
    this.fleet.destination.fleets.find((f, i) => {
      idx = i;
      return this.fleet === f;
    });
    const prev = this.fleet.destination.fleets[(idx + this.fleet.destination.fleets.length + 1) % this.fleet.destination.fleets.length];
    this.map.selectAndFocus(prev.id);
  }

  get starSystemName() {
    if (this.fleet.destination.name) {
      return this.fleet.destination.name;
    }
    return this.ts.strings.starSystem + ' ' + this.fleet.destination.id;
  }

  get originStarSystemName() {
    if (!this.fleet.origin) {
      return this.ts.strings.unknown;
    }
    if (this.fleet.origin.name) {
      return this.fleet.origin.name;
    }
    return this.ts.strings.starSystem + ' ' + this.fleet.origin.id;
  }

  clickStarSystem() {
    this.map.selectAndFocus(this.fleet.destination.id);
  }

  clickOriginStarSystem() {
    if (this.fleet.origin) {
      this.map.selectAndFocus(this.fleet.origin.id);
    }
  }

  getFleetStatus() {
    if (this.fleet.isTravelling) {
      return this.ts.strings.travelling;
    }
    return this.ts.strings.orbiting;
  }

}
