import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextService } from '../services/text.service';
import { CoreService } from '../services/core.service';
import { Store } from '../store';

export interface NavButton {
  text: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() btnMenuClick = new EventEmitter();
  @Input() asideMenuVisible: boolean;

  constructor(public store: Store, public coreService: CoreService, public ts: TextService) { }

  ngOnInit() {
  }

  emitEventBtnMenu(event: Event) {
    this.btnMenuClick.emit();
    event.stopPropagation();
  }
}
