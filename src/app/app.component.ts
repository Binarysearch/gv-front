import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  asideMenuVisible = false;

  constructor(private authService: AuthService) {}

  closeAsideMenu() {
    this.asideMenuVisible = false;
  }

  toggleAsideMenu() {
    this.asideMenuVisible = !this.asideMenuVisible;
  }

  ngOnInit(): void {
    this.authService.auth();
  }

}
