import { TextService } from './../../services/text.service';
import { CoreService } from './../../services/core.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarSystem } from 'src/app/game-objects/star-system';

@Component({
  selector: 'app-star-system-window',
  templateUrl: './star-system-window.component.html',
  styleUrls: ['./star-system-window.component.css']
})
export class StarSystemWindowComponent implements OnInit {

  @Input() starSystem: StarSystem;
  @Output() closeButton = new EventEmitter();
  maximized = false;
  activeTab = 'star';

  constructor(private core: CoreService, public ts: TextService) { }

  ngOnInit() {
    const statusString = localStorage.getItem('star-system-window-status');
    if (statusString) {
      const status = JSON.parse(statusString);
      this.maximized = status.maximized;
      this.activeTab = status.activeTab;
    }
  }

  get title(): string {
    return this.ts.strings.starSystem + ' ' + this.starSystem.id;
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
    localStorage.setItem('star-system-window-status', JSON.stringify(status));
  }
}
