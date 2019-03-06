import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet } from '../entities/planet';
import { GalaxiesService } from './galaxies.service';
import { Galaxy } from '../entities/galaxy';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetsUrl = 'https://galaxyvictor.com/api/planets';

  public _planets: Planet[] = [];
  private currentGalaxyId: number;

  constructor(private http: HttpClient, private galaxiesService: GalaxiesService) {
    this.galaxiesService.getCurrentGalaxy().subscribe((currentGalaxy: Galaxy) => {
      if (currentGalaxy) {
        this.currentGalaxyId = currentGalaxy.id;
      } else {
        this.currentGalaxyId = null;
      }
      this.reloadPlanets();
    });
  }

  public get planets(): Planet[] {
    return this._planets;
  }

  private reloadPlanets() {
    if (this.currentGalaxyId) {
      this.http.get<Planet[]>(this.planetsUrl + `?galaxy=${this.currentGalaxyId}`)
      .subscribe((data: Planet[]) => {
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
