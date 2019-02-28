import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserCivilization } from '../entities/user-civilization';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CivilizationsService {

  private civilizationUrl = 'https://galaxyvictor.com/api/civilization';

  private _currentCivilization: UserCivilization;
  currentGalaxyId: number;

  constructor(private http: HttpClient, private authService: AuthService) { }

  createCivilization(galaxyId: number, civilizationName: string, homeStarName: string): Observable<UserCivilization> {
    throw new Error("Method not implemented.");
  }

  public get currentCivilization(): UserCivilization {
    const galaxyId = this.authService.currentSession.user.currentGalaxy.id;
    if (this.currentGalaxyId !== galaxyId) {
      this._currentCivilization = null;
    }
    this.currentGalaxyId = galaxyId;

    if (!this._currentCivilization) {
      this.getUserCivilization(galaxyId).subscribe();
    }
    return this._currentCivilization;
  }

  private getUserCivilization(galaxyId: number): Observable<UserCivilization> {
    const subject: Subject<UserCivilization> = new Subject();

    this.http.get<UserCivilization>(this.civilizationUrl + `?galaxy=${galaxyId}`)
      .subscribe((data: UserCivilization) => {
        this._currentCivilization = data;
        subject.next(data);
      }, (error: any) => {
        this._currentCivilization = null;
        subject.error(error);
      }, () => {
        subject.complete();
      });

    return subject.asObservable();

  }

  public get hasCivilization(): boolean {
    const galaxyId = this.authService.currentSession.user.currentGalaxy.id;
    if (this.currentGalaxyId !== galaxyId) {
      this.getUserCivilization(galaxyId).subscribe();
    }
    this.currentGalaxyId = galaxyId;
    return this._currentCivilization != null;
  }
}
