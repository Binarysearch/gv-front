import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { StarSystem } from '../entities/star-system';

@Injectable({
  providedIn: 'root'
})
export class StarSystemsService {

  private starSystemsUrl = 'https://galaxyvictor.com/api/star-systems';

  public _starSystems: StarSystem[];
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public get starSystems() {
    const galaxyId = this.authService.currentSession.user.currentGalaxy.id;
    if (this.currentGalaxyId !== galaxyId) {
      this._starSystems = null;
    }
    this.currentGalaxyId = galaxyId;

    if (!this._starSystems) {
      this._starSystems = [];
      this.getStarSystems(galaxyId).subscribe();
    }
    return this._starSystems;
  }

  private getStarSystems(galaxyId: number): Observable<StarSystem[]> {
    const subject: Subject<StarSystem[]> = new Subject();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.authService.currentSession.token
      })
    };

    this.http.get<StarSystem[]>(this.starSystemsUrl + `?galaxy=${galaxyId}`, httpOptions)
      .subscribe((data: StarSystem[]) => {
        this._starSystems = data.map(ss => {
          ss.objectType = 'StarSystem'; return ss;
        });
        subject.next(data);
      }, (error: any) => {
        subject.error(error);
      }, () => {
        subject.complete();
      });

    return subject.asObservable();

  }
}
