import { Component, OnInit, Input } from '@angular/core';

export interface NavButton{
  text:string,
  icon:string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input("buttons") buttons: NavButton[];

  constructor() { }

  ngOnInit() {
  }

}
