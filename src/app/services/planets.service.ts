import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanetDTO } from '../dtos/planet';
import { Store } from '../store';
import { Planet } from '../game-objects/planet';
import { ColoniesService } from './colonies.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetsUrl = 'https://galaxyvictor.com/api/planets';


  constructor(private http: HttpClient, private store: Store, private coloniesService: ColoniesService) {

  }

  public loadPlanets(galaxyId: number) {
    if (galaxyId) {
      this.http.get<PlanetDTO[]>(this.planetsUrl + `?galaxy=${galaxyId}`)
      .subscribe((data: PlanetDTO[]) => {
        data.forEach(p => {
          this.store.addPlanet(new Planet(p));
        });
        this.coloniesService.loadColonies();
      }, (error: any) => {
        console.log(error);
      });
    }
  }

}
