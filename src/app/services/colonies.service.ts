import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColonyDTO } from '../dtos/colony';
import { Store } from '../store';
import { Colony } from '../game-objects/colony';

@Injectable({
  providedIn: 'root'
})
export class ColoniesService  {

  private coloniesUrl = 'https://galaxyvictor.com/api/colonies';


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
