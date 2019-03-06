import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserCivilizationDTO } from '../dtos/user-civilization';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GalaxiesService } from './galaxies.service';
import { GalaxyDTO } from '../dtos/galaxy';

@Injectable({
  providedIn: 'root'
})
export class CivilizationsService {

  private civilizationUrl = 'https://galaxyvictor.com/api/civilization';

  private _currentCivilization: UserCivilizationDTO;
  private currentCivilizationSubject: Subject<UserCivilizationDTO> = new Subject<UserCivilizationDTO>();
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: GalaxyDTO) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadCurrentCivilization();
    });
  }

  createCivilization(galaxyId: number, civilizationName: string, homeStarName: string): Observable<UserCivilizationDTO> {
    return this.http.post<UserCivilizationDTO>(this.civilizationUrl,
      {galaxyId: galaxyId, name: civilizationName, homeStarName: homeStarName}
      ).pipe(
      tap<UserCivilizationDTO>((civ: UserCivilizationDTO) => {
        this.currentCivilizationSubject.next(civ);
        this._currentCivilization = civ;
      })
    );
  }

  public get currentCivilization(): UserCivilizationDTO {
    return this._currentCivilization;
  }

  private reloadCurrentCivilization(): void {
    if (this.currentGalaxyId) {
      this.http.get<UserCivilizationDTO>(this.civilizationUrl + `?galaxy=${this.currentGalaxyId}`)
        .subscribe((data: UserCivilizationDTO) => {
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

  public getCurrentCivilization(): Observable<UserCivilizationDTO> {
    return this.currentCivilizationSubject.asObservable();
  }

}
