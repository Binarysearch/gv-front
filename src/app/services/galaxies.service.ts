import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, Session } from './auth.service';
import { tap } from 'rxjs/operators';
import { Galaxy } from '../entities/galaxy';

@Injectable({
  providedIn: 'root'
})
export class GalaxiesService {

  private galaxiesUrl = 'https://galaxyvictor.com/api/galaxies';
  private currentGalaxyUrl = 'https://galaxyvictor.com/api/current-galaxy';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGalaxies(): Observable<Galaxy[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.authService.currentSession.token
      })
    };

    return this.http.get<Galaxy[]>(this.galaxiesUrl, httpOptions);
  }

  selectGalaxy(id: number): Observable<Galaxy> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.authService.currentSession.token
      })
    };

    return this.http.put<Galaxy>(this.currentGalaxyUrl, {id: id}, httpOptions).pipe(
      tap<Galaxy>((galaxy: Galaxy) => {
        const session: Session = this.authService.currentSession;
        session.user.currentGalaxy = galaxy;
        this.authService.currentSession = session;
      })
    );
  }

}
