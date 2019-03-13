import { Injectable, isDevMode } from '@angular/core';
import { Store } from '../store';
import { ShipDTO } from '../dtos/ship';
import { HttpClient } from '@angular/common/http';
import { Ship } from '../game-objects/ship';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private host = (isDevMode()) ? 'http://localhost:8080' : 'https://galaxyvictor.com';

  private shipsUrl = this.host + '/api/ships';


  constructor(private http: HttpClient, private store: Store) {

  }

  public getFleetShips(fleetId: number): Observable<ShipDTO[]> {
    return this.http.get<ShipDTO[]>(this.shipsUrl + `?fleet=${fleetId}`);
  }
}
