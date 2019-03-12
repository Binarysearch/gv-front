import { Store } from './../store';
import { Injectable, isDevMode } from '@angular/core';
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

  private host = (isDevMode()) ? 'http://localhost:8080' : 'https://galaxyvictor.com';

  private galaxiesUrl = this.host + '/api/galaxies';
  private currentGalaxyUrl = this.host + '/api/current-galaxy';

  private currentGalaxySubject: Subject<GalaxyDTO> = new Subject<GalaxyDTO>();

  constructor(private http: HttpClient, private authService: AuthService, private store: Store) {
    this.authService.getCurrentSession().subscribe((session: SessionDTO) => {
      if (session) {
        this.currentGalaxySubject.next(session.user.currentGalaxy);
      } else {
        this.currentGalaxySubject.next(null);
      }
    });
  }

  getGalaxies(): Observable<GalaxyDTO[]> {
    return this.http.get<GalaxyDTO[]>(this.galaxiesUrl);
  }

  selectGalaxy(id: number): Observable<GalaxyDTO> {
    return this.http.put<GalaxyDTO>(this.currentGalaxyUrl, {id: id}).pipe(
      tap<GalaxyDTO>((galaxy: GalaxyDTO) => {
        this.currentGalaxySubject.next(galaxy);
        this.store.setGalaxy(galaxy);
      })
    );
  }

  getCurrentGalaxy(): Observable<GalaxyDTO> {
    return this.currentGalaxySubject.asObservable();
  }
}
