import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionDTO } from '../dtos/session';
import { GalaxyDTO } from '../dtos/galaxy';
import { Store } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '/galaxy';

  private authUrl = 'https://galaxyvictor.com/api/auth';
  private loginUrl = 'https://galaxyvictor.com/api/login';
  private registerUrl = 'https://galaxyvictor.com/api/register';

  private session: SessionDTO;
  private currentSessionSubject: Subject<SessionDTO> = new Subject<SessionDTO>();

  constructor(private http: HttpClient, private router: Router, private store: Store) {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      this.http.post<SessionDTO>(this.authUrl, sessionToken).subscribe((session: SessionDTO) => {
        this.onSessionStart(session);
      }, (error) => {
        console.log(error);
        localStorage.removeItem('sessionToken');
      });
    }
  }

  public get isAuthenticated(): boolean {
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

  login(email: string, password: string): Observable<SessionDTO> {
    return this.http.post<SessionDTO>(this.loginUrl, {email: email, password: password}).pipe(
      tap<SessionDTO>((session: SessionDTO) => {
        this.onSessionStart(session);
      })
    );
  }

  register(email: string, password: string): Observable<SessionDTO> {
    return this.http.post<SessionDTO>(this.registerUrl, {email: email, password: password}).pipe(
      tap<SessionDTO>((session: SessionDTO) => {
        this.onSessionStart(session);
      })
    );
  }

  private onSessionStart(session: SessionDTO) {
    this.session = session;
    this.store.setSession(session);
    localStorage.setItem('sessionToken', session.token);
    this.currentSessionSubject.next(this.session);
    this.router.navigate([this.redirectUrl]);
  }

  public get sessionToken() {
    if (this.isAuthenticated) {
      return this.currentSession.token;
    }
  }

  public getCurrentSession(): Observable<SessionDTO> {
    return this.currentSessionSubject.asObservable();
  }
}
