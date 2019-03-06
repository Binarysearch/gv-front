import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { StarSystem } from '../entities/star-system';
import { Galaxy } from '../entities/galaxy';
import { GalaxiesService } from './galaxies.service';

@Injectable({
  providedIn: 'root'
})
export class StarSystemsService {

  private starSystemsUrl = 'https://galaxyvictor.com/api/star-systems';

  public _starSystems: StarSystem[] = [];
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: Galaxy) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadStarSystems();
    });
  }

  public get starSystems(): StarSystem[] {
    return this._starSystems;
  }

  getStarSystem(id: number): Observable<StarSystem> {
    return this.http.get<StarSystem>(this.starSystemsUrl + `/${id}`);
  }

  private reloadStarSystems() {
    if (this.currentGalaxyId) {
      this.http.get<StarSystem[]>(this.starSystemsUrl + `?galaxy=${this.currentGalaxyId}`)
      .subscribe((data: StarSystem[]) => {
        this._starSystems = data.map(ss => {
          ss.objectType = 'StarSystem'; return ss;
        });
      }, (error: any) => {
        console.log(error);
      });
    } else {
      this._starSystems = [];
    }
  }
}
