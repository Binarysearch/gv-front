import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanetDTO } from '../dtos/planet';
import { GalaxiesService } from './galaxies.service';
import { GalaxyDTO } from '../dtos/galaxy';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetsUrl = 'https://galaxyvictor.com/api/planets';

  public _planets: PlanetDTO[] = [];
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: GalaxyDTO) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadPlanets();
    });
  }

  public get planets(): PlanetDTO[] {
    return this._planets;
  }

  private reloadPlanets() {
    if (this.currentGalaxyId) {
      this.http.get<PlanetDTO[]>(this.planetsUrl + `?galaxy=${this.currentGalaxyId}`)
      .subscribe((data: PlanetDTO[]) => {
        this._planets = data.map(p => {
          p.starX = 24687.8046875;
          p.starY = 620.1268310546875;
          p.objectType = 'Planet';
          return p;
        });
      }, (error: any) => {
        console.log(error);
      });
    } else {
      this._planets = [];
    }
  }

}
