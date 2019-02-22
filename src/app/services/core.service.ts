import { Galaxy } from './galaxies.service';
import { Injectable } from '@angular/core';
import { AuthService, Session } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private authService: AuthService
  ) { }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  public get currentGalaxy(): Galaxy {
    return this.authService.currentGalaxy;
  }
  public get currentSession(): Session {
    return this.authService.currentSession;
  }

  public logout() {
    this.authService.logout();
  }
}
