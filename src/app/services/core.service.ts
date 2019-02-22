import { GalaxiesService } from './galaxies.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Galaxy } from '../entities/galaxy';
import { Observable } from 'rxjs';
import { StarSystemsService } from './star-systems.service';
import { Session } from '../entities/session';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private authService: AuthService,
    private starSystemsService: StarSystemsService,
    private galaxiesService: GalaxiesService
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

  public getGalaxies(): Observable<Galaxy[]> {
    return this.galaxiesService.getGalaxies();
  }

  public selectGalaxy(id: number): Observable<Galaxy> {
    return this.galaxiesService.selectGalaxy(id);
  }

  public get starSystems() {
    return this.starSystemsService.starSystems;
  }

  public login(email: string, password: string): Observable<Session> {
    return this.authService.login(email, password);
  }

  public register(email: string, password: string): Observable<Session> {
    return this.authService.register(email, password);
  }


}
