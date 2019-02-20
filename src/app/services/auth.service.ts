import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Session{
  token: string,
  user: {
    id: number,
    email: String
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string = "/galaxy";

  private loginUrl = 'https://galaxyvictor.com/api/login';
  private registerUrl = 'https://galaxyvictor.com/api/register';
  private session: Session;

  constructor(private http: HttpClient, private router: Router) {
    const sessionString = localStorage.getItem('session');
    this.session = JSON.parse(sessionString);
  }

  public get isAuthenticated(): boolean {
    return this.session != null && this.session.token != null;
  }

  public get currentSession(){
    return this.session;
  }

  public logout(){
    //TODO: logout in server, destroy session
    localStorage.removeItem('session');
    this.session = null;
    this.router.navigate(['']);
  }

  login(email:string, password: string): Observable<Session> {
    return this.http.post<Session>(this.loginUrl, {email:email, password:password}).pipe(
      tap<Session>((session: Session)=> {
        this.session = session;
        localStorage.setItem("session", JSON.stringify(session));
        this.router.navigate([this.redirectUrl]);
      })
    );
  }

  register(email:string, password: string): Observable<Session> {
    return this.http.post<Session>(this.registerUrl, {email:email, password:password}).pipe(
      tap<Session>((session: Session)=> {
        this.session = session;
        localStorage.setItem("session", JSON.stringify(session));
        this.router.navigate([this.redirectUrl]);
      })
    );
  }

}
