import { AuthService } from './auth.service';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserCivilizationDTO } from '../dtos/user-civilization';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GalaxiesService } from './galaxies.service';
import { GalaxyDTO } from '../dtos/galaxy';
import { Store } from '../store';
import { CivilizationDTO } from '../dtos/civilization';
import { Civilization } from '../game-objects/civilization';
import { ColoniesService } from './colonies.service';
import { FleetsService } from './fleets.service';
import { Planet } from '../game-objects/planet';

@Injectable({
  providedIn: 'root'
})
export class CivilizationsService {

  private host = (isDevMode()) ? 'http://localhost:8080' : 'https://galaxyvictor.com';

  private civilizationUrl = this.host + '/api/civilization';
  private civilizationsUrl = this.host + '/api/civilizations';

  private _currentCivilization: UserCivilizationDTO;
  private currentCivilizationSubject: Subject<UserCivilizationDTO> = new Subject<UserCivilizationDTO>();
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private store: Store, private galaxiesService: GalaxiesService,
     private coloniesService: ColoniesService, private fleetsService: FleetsService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: GalaxyDTO) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      //this.reloadCurrentCivilization();
    });
  }

  createCivilization(galaxyId: number, civilizationName: string, homeStarName: string): Observable<UserCivilizationDTO> {
    return this.http.post<UserCivilizationDTO>(this.civilizationUrl,
      {galaxyId: galaxyId, name: civilizationName, homeStarName: homeStarName}
      ).pipe(
      tap<UserCivilizationDTO>((civ: UserCivilizationDTO) => {
        //this.store.addPlanet(new Planet(civ.homeworld));
        this.currentCivilizationSubject.next(civ);
        this.store.serverTime = civ.serverTime;
        this.store.userCivilization = civ;
        this._currentCivilization = civ;
      })
    );
  }

  public get currentCivilization(): UserCivilizationDTO {
    return this._currentCivilization;
  }

  reloadCurrentCivilization(): void {
    if (this.currentGalaxyId) {
      this.http.get<UserCivilizationDTO>(this.civilizationUrl + `?galaxy=${this.currentGalaxyId}`)
        .subscribe((data: UserCivilizationDTO) => {
          //this.store.addPlanet(new Planet(data.homeworld));
          this.currentCivilizationSubject.next(data);
          this.store.serverTime = data.serverTime;
          this.store.userCivilization = data;
          this._currentCivilization = data;
        }, (error: any) => {
          this._currentCivilization = null;
          console.log(error);
        });
    } else {
      this._currentCivilization = null;
    }
  }

  loadCivilizations(): any {
    this.http.get<CivilizationDTO[]>(this.civilizationsUrl)
    .subscribe((data: CivilizationDTO[]) => {
      data.forEach(p => {
        this.store.addCivilization(new Civilization(p));
      });
      this.coloniesService.loadColonies();
      this.fleetsService.loadFleets();
    }, (error: any) => {
      console.log(error);
    });
  }

  public get hasCivilization(): boolean {
    return this._currentCivilization != null;
  }

  public getCurrentCivilization(): Observable<UserCivilizationDTO> {
    return this.currentCivilizationSubject.asObservable();
  }

}
