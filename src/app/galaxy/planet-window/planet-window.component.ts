import { Planet } from './../../game-objects/planet';
import { TextService } from './../../services/text.service';
import { CoreService } from './../../services/core.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-planet-window',
  templateUrl: './planet-window.component.html',
  styleUrls: ['./planet-window.component.css']
})
export class PlanetWindowComponent implements OnInit {

  @Input() planet: Planet;
  @Output() closeButton = new EventEmitter();
  maximized = false;
  activeTab = 'planet';

  constructor(private core: CoreService, public ts: TextService) { }

  ngOnInit() {
    const statusString = localStorage.getItem('planet-window-status');
    if (statusString) {
      const status = JSON.parse(statusString);
      this.maximized = status.maximized;
      this.activeTab = status.activeTab;
    }
  }

  get title(): string {
    return this.ts.strings.planet + ' ' + this.planet.id;
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

  activateTab(tabName: string) {
    this.activeTab = tabName;
    this.storeStatus();
  }

  storeStatus() {
    const status = {
      maximized: this.maximized,
      activeTab: this.activeTab
    };
    localStorage.setItem('planet-window-status', JSON.stringify(status));
  }
}
