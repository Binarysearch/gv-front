import { Component } from '@angular/core';
import { AsideOption } from './aside/aside.component';
import { NavButton } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  asideMenuVisible = false;
  
  asideMenuOptions: AsideOption[] = [
    {text:"Option 1", onclick:()=>{alert();}},
    {text:"Option 2"},
    {text:"Option 3"},
  ];

  closeAsideMenu(){
    this.asideMenuVisible = false;
  }

  toggleAsideMenu(){
    this.asideMenuVisible = !this.asideMenuVisible;
  }

}
