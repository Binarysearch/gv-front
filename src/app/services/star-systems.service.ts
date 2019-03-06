import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StarSystemDTO } from '../dtos/star-system';
import { GalaxyDTO } from '../dtos/galaxy';
import { GalaxiesService } from './galaxies.service';

@Injectable({
  providedIn: 'root'
})
export class StarSystemsService {

  private starSystemsUrl = 'https://galaxyvictor.com/api/star-systems';

  public _starSystems: StarSystemDTO[] = [];
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: GalaxyDTO) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadStarSystems();
    });
  }

  public get starSystems(): StarSystemDTO[] {
    return this._starSystems;
  }

  getStarSystem(id: number): Observable<StarSystemDTO> {
    return this.http.get<StarSystemDTO>(this.starSystemsUrl + `/${id}`);
  }

  private reloadStarSystems() {
    if (this.currentGalaxyId) {
      this.http.get<StarSystemDTO[]>(this.starSystemsUrl + `?galaxy=${this.currentGalaxyId}`)
      .subscribe((data: StarSystemDTO[]) => {
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
