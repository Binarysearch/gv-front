import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Galaxy } from '../entities/galaxy';
import { Session } from '../entities/session';

@Injectable({
  providedIn: 'root'
})
export class GalaxiesService {

  private galaxiesUrl = 'https://galaxyvictor.com/api/galaxies';
  private currentGalaxyUrl = 'https://galaxyvictor.com/api/current-galaxy';

  private currentGalaxySubject: Subject<Galaxy> = new Subject<Galaxy>();
  private _currentGalaxy: Galaxy;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getCurrentSession().subscribe((session: Session) => {
      if (session) {
        this.currentGalaxySubject.next(session.user.currentGalaxy);
        this._currentGalaxy = session.user.currentGalaxy;
      } else {
        this.currentGalaxySubject.next(null);
        this._currentGalaxy = null;
      }
    });
  }

  public get currentGalaxy(): Galaxy {
    return this._currentGalaxy;
  }

  getGalaxies(): Observable<Galaxy[]> {
    return this.http.get<Galaxy[]>(this.galaxiesUrl);
  }

  selectGalaxy(id: number): Observable<Galaxy> {
    return this.http.put<Galaxy>(this.currentGalaxyUrl, {id: id}).pipe(
      tap<Galaxy>((galaxy: Galaxy) => {
        this.currentGalaxySubject.next(galaxy);
        this._currentGalaxy = galaxy;
        const sessionString = localStorage.getItem('session');
        const session: Session = JSON.parse(sessionString);
        session.user.currentGalaxy = this._currentGalaxy;
        localStorage.setItem('session', JSON.stringify(session));
      })
    );
  }

  getCurrentGalaxy(): Observable<Galaxy> {
    return this.currentGalaxySubject.asObservable();
  }
}
