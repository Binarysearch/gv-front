import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FleetDTO } from '../dtos/fleet';
import { Store } from '../store';
import { Fleet } from '../game-objects/fleet';
import { StarSystem } from '../game-objects/star-system';

@Injectable({
  providedIn: 'root'
})
export class FleetsService {

  private fleetsUrl = 'https://galaxyvictor.com/api/fleets';


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
    this.store.removeFleet(fleet);
    fleet.travelStartedTime = this.store.gameTime;
    fleet.destinationId = destination.id;
    fleet.originId = fleet.destination.id;
    this.store.addFleet(fleet);
  }
}
