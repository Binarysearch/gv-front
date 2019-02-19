import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  redirectUrl: string = "";

  private loginUrl = 'https://galaxyvictor.com/api/login';
  private registerUrl = 'https://galaxyvictor.com/api/register';

  constructor(private http: HttpClient) { }

  public get isAuthenticated(): boolean {
    const sessionString = localStorage.getItem('session');
    const session: Session = JSON.parse(sessionString);
    return session != null && session.token != null;
  }

  public logout(){
    localStorage.removeItem('session');
  }

  login(email:string, password: string): Observable<Session> {
    return this.http.post<Session>(this.loginUrl, {email:email, password:password});
  }

  register(email:string, password: string): Observable<Session> {
    return this.http.post<Session>(this.registerUrl, {email:email, password:password});
  }
  
  private handleError(operation: String) {
    return (err: any) => {
        let errMsg = `error in ${operation}() retrieving ${this.loginUrl}`;
        console.log(`${errMsg}:`, err);
        if(err instanceof HttpErrorResponse) {
          if(err.status == 401){
            errMsg = err.error.message;
          }
        }
        return Observable.throw(errMsg);
    }
}

}
