import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserCivilization } from '../entities/user-civilization';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GalaxiesService } from './galaxies.service';
import { Galaxy } from '../entities/galaxy';

@Injectable({
  providedIn: 'root'
})
export class CivilizationsService {

  private civilizationUrl = 'https://galaxyvictor.com/api/civilization';

  private _currentCivilization: UserCivilization;
  private currentCivilizationSubject: Subject<UserCivilization> = new Subject<UserCivilization>();
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: Galaxy) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadCurrentCivilization();
    });
  }

  createCivilization(galaxyId: number, civilizationName: string, homeStarName: string): Observable<UserCivilization> {
    return this.http.post<UserCivilization>(this.civilizationUrl,
      {galaxyId: galaxyId, name: civilizationName, homeStarName: homeStarName}
      ).pipe(
      tap<UserCivilization>((civ: UserCivilization) => {
        this.currentCivilizationSubject.next(civ);
        this._currentCivilization = civ;
      })
    );
  }

  public get currentCivilization(): UserCivilization {
    return this._currentCivilization;
  }

  private reloadCurrentCivilization(): void {
    if (this.currentGalaxyId) {
      this.http.get<UserCivilization>(this.civilizationUrl + `?galaxy=${this.currentGalaxyId}`)
        .subscribe((data: UserCivilization) => {
          this.currentCivilizationSubject.next(data);
          this._currentCivilization = data;
        }, (error: any) => {
          this._currentCivilization = null;
          console.log(error);
        });
    } else {
      this._currentCivilization = null;
    }
  }

  public get hasCivilization(): boolean {
    return this._currentCivilization != null;
  }

  public getCurrentCivilization(): Observable<UserCivilization> {
    return this.currentCivilizationSubject.asObservable();
  }

}
