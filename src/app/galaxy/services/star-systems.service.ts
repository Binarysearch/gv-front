import { Injectable } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

export interface StarSystem{
  id: number,
  name?: string,
  x: number,
  y: number,
  type: number,
  size: number
}

@Injectable({
  providedIn: 'root'
})
export class StarSystemsService {

  private starSystemsUrl = 'https://galaxyvictor.com/api/star-systems?galaxy=164';

  public _starSystems: StarSystem[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  public get starSystems(){
    if(!this._starSystems){
      this._starSystems = [];
      this.getStarSystems().subscribe();
    }
    return this._starSystems;
  }

  private getStarSystems(): Observable<StarSystem[]> {
    const subject: Subject<StarSystem[]> = new Subject();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.authService.currentSession.token
      })
    };

    this.http.get<StarSystem[]>(this.starSystemsUrl, httpOptions)
      .subscribe((data: StarSystem[])=>{
        this._starSystems = data;
        subject.next(data);
      },(error: any)=>{
        subject.error(error);
      },()=>{
        subject.complete();
      });

    return subject.asObservable();
    
  }
}
