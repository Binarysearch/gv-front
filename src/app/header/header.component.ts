import { Component, OnInit, Input } from '@angular/core';

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

  buttons: NavButton[] = [
    {text:"Galaxia", icon: "fa-map", link:"/galaxy"},
    {text:"Colonias", icon: "fa-university", link:"/colonies"},
    {text:"Flota", icon: "fa-space-shuttle", link:"/fleets"},
    {text:"Planetas", icon: "fa-globe", link:"/planets"},
    {text:"Comercio", icon: "fa-exchange", link:"/commerce"},
    {text:"Investigación", icon: "fa-flask", link:"/research"},
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
