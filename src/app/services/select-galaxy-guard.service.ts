import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SelectGalaxyGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentSession = this.authService.currentSession;
    if (currentSession) {
      if (currentSession.user.currentGalaxy) {
        return true;
      }
      this.router.navigate(['/galaxies']);
    }

    return false;
  }

}
