import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Session } from '../entities/session';
import { Galaxy } from '../entities/galaxy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '/galaxy';

  private loginUrl = 'https://galaxyvictor.com/api/login';
  private registerUrl = 'https://galaxyvictor.com/api/register';
  private session: Session;
  private currentSessionSubject: Subject<Session> = new Subject<Session>();

  constructor(private http: HttpClient, private router: Router) {

  }

  public get isAuthenticated(): boolean {
    if (!this.session) {
      const sessionString = localStorage.getItem('session');
      this.session = JSON.parse(sessionString);
      this.currentSessionSubject.next(this.session);
    }
    return this.session != null && this.session.token != null;
  }

  public get currentSession() {
    return this.session;
  }

  public logout() {
    // TODO: logout in server, destroy session
    localStorage.removeItem('session');
    this.session = null;
    this.router.navigate(['']);
  }

  login(email: string, password: string): Observable<Session> {
    return this.http.post<Session>(this.loginUrl, {email: email, password: password}).pipe(
      tap<Session>((session: Session) => {
        this.onSessionStart(session);
      })
    );
  }

  register(email: string, password: string): Observable<Session> {
    return this.http.post<Session>(this.registerUrl, {email: email, password: password}).pipe(
      tap<Session>((session: Session) => {
        this.onSessionStart(session);
      })
    );
  }

  private onSessionStart(session: Session) {
    this.session = session;
    localStorage.setItem('session', JSON.stringify(session));
    this.currentSessionSubject.next(this.session);
    this.router.navigate([this.redirectUrl]);
  }

  public get sessionToken() {
    if (this.isAuthenticated) {
      return this.currentSession.token;
    }
  }

  public getCurrentSession(): Observable<Session> {
    return this.currentSessionSubject.asObservable();
  }
}
