import { CoreService } from './../../services/core.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarSystem } from '../../entities/star-system';

@Component({
  selector: 'app-star-system-window',
  templateUrl: './star-system-window.component.html',
  styleUrls: ['./star-system-window.component.css']
})
export class StarSystemWindowComponent implements OnInit {

  @Input() starSystem: StarSystem;
  @Output() closeButton = new EventEmitter();
  maximized = false;

  constructor(private core: CoreService) { }

  ngOnInit() {
    const statusString = localStorage.getItem('star-system-window-status');
    if (statusString) {
      const status = JSON.parse(statusString);
      this.maximized = status.maximized;
    }
  }

  get title(): string {
    return 'Star System ' + this.starSystem.id;
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
      maximized: this.maximized
    };
    localStorage.setItem('star-system-window-status', JSON.stringify(status));
  }
}
