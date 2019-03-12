import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ColonyDTO } from '../dtos/colony';
import { Store } from '../store';
import { Colony } from '../game-objects/colony';

@Injectable({
  providedIn: 'root'
})
export class ColoniesService  {

  private host = (isDevMode()) ? 'http://localhost:8080' : 'https://galaxyvictor.com';

  private coloniesUrl = this.host + '/api/colonies';


  constructor(private http: HttpClient, private store: Store) {

  }

  public loadColonies() {
    this.http.get<ColonyDTO[]>(this.coloniesUrl)
    .subscribe((data: ColonyDTO[]) => {
      data.forEach(c => {
        this.store.addColony(new Colony(c));
      });
    }, (error: any) => {
      console.log(error);
    });
  }

}
