import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/auth/token.service';

@Injectable()
export class TokenInterceptor {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.tokenService.getToken();    
    if (token) {
      request = this.addToken(request);
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 403) {
          console.log("unauthorized!")
          localStorage.clear()
          window.location.reload()
        }else if (err.status === 400) {
          console.log("buscando refrescar")
          return this.handle400Error(request, next);
        }
        return throwError( err );
      })
    );
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      }
    });
  }

  private handle400Error(request: HttpRequest<any>, next: HttpHandler) {
      return this.authService.refreshAccessToken(next).pipe(
        switchMap((tokens: any) => {
          this.authService.handleTokens(tokens)
          return next.handle(this.addToken(request));
        })
      );

  }
}
