import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TextService } from '../services/text.service';

export interface NavButton{
  text:string,
  icon:string,
  link:string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output("btnMenuClick") btnMenuClick = new EventEmitter();
  @Input("asideMenuVisible") asideMenuVisible: boolean;

  constructor(public authService: AuthService, public ts: TextService) { }

  ngOnInit() {
  }

  emitEventBtnMenu(event: Event){
    this.btnMenuClick.emit();
    event.stopPropagation();
  }
}
