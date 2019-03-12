import { TravelDTO } from './../dtos/travel';
import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { FleetDTO } from '../dtos/fleet';
import { Store } from '../store';
import { Fleet } from '../game-objects/fleet';
import { StarSystem } from '../game-objects/star-system';

@Injectable({
  providedIn: 'root'
})
export class FleetsService {

  private host = (isDevMode()) ? 'http://localhost:8080' : 'https://galaxyvictor.com';

  private fleetsUrl = this.host + '/api/fleets';
  private travelsUrl = this.host + '/api/travels';


  constructor(private http: HttpClient, private store: Store) {

  }

  public loadFleets() {
    this.http.get<FleetDTO[]>(this.fleetsUrl)
    .subscribe((data: FleetDTO[]) => {
      data.forEach(f => {
        this.store.addFleet(new Fleet(f));
      });
    }, (error: any) => {
      console.log(error);
    });
  }

  startTravel(fleet: Fleet, destination: StarSystem): any {
    this.http.post<TravelDTO>(this.travelsUrl, {fleet: fleet.id, destination: destination.id})
    .subscribe((travel: TravelDTO) => {
      /*this.store.removeFleet(fleet);
      fleet.travelStartTime = travel.startTime;
      fleet.destinationId = travel.destination;
      fleet.originId = travel.origin;
      this.store.addFleet(fleet);*/
    });
  }
}
