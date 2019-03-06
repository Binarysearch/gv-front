import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { GalaxyDTO } from '../dtos/galaxy';
import { SessionDTO } from '../dtos/session';

@Injectable({
  providedIn: 'root'
})
export class GalaxiesService {

  private galaxiesUrl = 'https://galaxyvictor.com/api/galaxies';
  private currentGalaxyUrl = 'https://galaxyvictor.com/api/current-galaxy';

  private currentGalaxySubject: Subject<GalaxyDTO> = new Subject<GalaxyDTO>();
  private _currentGalaxy: GalaxyDTO;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getCurrentSession().subscribe((session: SessionDTO) => {
      if (session) {
        this.currentGalaxySubject.next(session.user.currentGalaxy);
        this._currentGalaxy = session.user.currentGalaxy;
      } else {
        this.currentGalaxySubject.next(null);
        this._currentGalaxy = null;
      }
    });
  }

  public get currentGalaxy(): GalaxyDTO {
    return this._currentGalaxy;
  }

  getGalaxies(): Observable<GalaxyDTO[]> {
    return this.http.get<GalaxyDTO[]>(this.galaxiesUrl);
  }

  selectGalaxy(id: number): Observable<GalaxyDTO> {
    return this.http.put<GalaxyDTO>(this.currentGalaxyUrl, {id: id}).pipe(
      tap<GalaxyDTO>((galaxy: GalaxyDTO) => {
        this.currentGalaxySubject.next(galaxy);
        this._currentGalaxy = galaxy;
        const sessionString = localStorage.getItem('session');
        const session: SessionDTO = JSON.parse(sessionString);
        session.user.currentGalaxy = this._currentGalaxy;
        localStorage.setItem('session', JSON.stringify(session));
      })
    );
  }

  getCurrentGalaxy(): Observable<GalaxyDTO> {
    return this.currentGalaxySubject.asObservable();
  }
}
