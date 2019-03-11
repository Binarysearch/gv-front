import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '../store';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // exclude login requests...
    if (req.url.search('/api/auth') !== -1 || req.url.search('/api/login') !== -1 || req.url.search('/api/register') !== -1) {
      return next.handle(req);
    }


    if (this.store.session) {
      const token = this.store.session.token;
      if (token) {
        req = req.clone({ headers: req.headers.set('token', token) });
      }
    }


    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
            reason: error && error.error.reason ? error.error.reason : '',
            status: error.status
        };
        console.log(data);
        return throwError(error);
      })
    );
  }
}
