import { Store } from './../store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StarSystemDTO } from '../dtos/star-system';
import { GalaxyDTO } from '../dtos/galaxy';
import { GalaxiesService } from './galaxies.service';
import { StarSystem } from '../game-objects/star-system';
import { PlanetsService } from './planets.service';

@Injectable({
  providedIn: 'root'
})
export class StarSystemsService {

  private starSystemsUrl = 'https://galaxyvictor.com/api/star-systems';

  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService,
     private planetsService: PlanetsService, private store: Store) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: GalaxyDTO) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadStarSystems();
    });
  }

  getStarSystem(id: number): Observable<StarSystemDTO> {
    return this.http.get<StarSystemDTO>(this.starSystemsUrl + `/${id}`);
  }

  private reloadStarSystems() {
    this.store.clear();
    if (this.currentGalaxyId) {
      this.http.get<StarSystemDTO[]>(this.starSystemsUrl + `?galaxy=${this.currentGalaxyId}`)
      .subscribe((data: StarSystemDTO[]) => {
        data.forEach(ss => {
          this.store.addStarSystem(new StarSystem(ss));
        });
        this.planetsService.loadPlanets(this.currentGalaxyId);
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}
