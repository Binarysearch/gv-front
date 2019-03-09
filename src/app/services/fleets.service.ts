import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FleetDTO } from '../dtos/fleet';
import { Store } from '../store';
import { Fleet } from '../game-objects/fleet';

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
}
