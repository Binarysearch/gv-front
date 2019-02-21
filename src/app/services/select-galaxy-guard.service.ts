import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService, Session } from './auth.service';
import { Galaxy } from './galaxies.service';

@Injectable({
  providedIn: 'root'
})
export class SelectGalaxyGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let currentSession = this.authService.currentSession;
    if(currentSession){
      let currentGalaxy: Galaxy = currentSession.user.currentGalaxy;
      if(currentGalaxy){
        return true;
      }
      this.router.navigate(['/galaxies']);
    }

    return false;
  }
  
}
