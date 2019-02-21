import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  asideMenuVisible = false;
  
  closeAsideMenu(){
    this.asideMenuVisible = false;
  }

  toggleAsideMenu(){
    this.asideMenuVisible = !this.asideMenuVisible;
  }

}
