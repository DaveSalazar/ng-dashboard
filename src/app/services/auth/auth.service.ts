import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAuthService } from './IAuthService';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'refreshToken';
  private URL = environment.BASE_URL + '/api/v1'
  constructor(
    private router: Router,
    private http: HttpClient,
    private token: TokenService,
    private snackBar: MatSnackBar,
  ) {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/login`, user).pipe(     
      catchError((error) => {
        this.snackBar.open(error.error.message, 'Aceptar', {
          duration: 2000,
        });
        return null;
      })
    );
  }

  logout(): void {
    this.doLogoutUser();
    this.router.navigate(['/authentication'])
  }

  register(user: { username: string; password: string }): Observable<boolean> {
    return this.http
      .post<any>(`${this.URL}/auth/register`, user)
      .pipe(
        tap((response) => this.doLoginUser(response.token)),
        catchError((error) => {
          this.snackBar.open(error.error.message, 'Aceptar', {
            duration: 2000,
          });
          throw error;
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http
      .post<any>(`${this.URL}/auth/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: any) => {
          this.storeJwtToken(tokens.jwt);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(response: any) {
    this.storeToken(response.token);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  handleTokens(data) {
    const {token, refreshToken} = data
    if (!token || !refreshToken){
      localStorage.clear()
      window.location.reload()
      throw "No token"
    }
    if (token) this.token.set(token);
    if (refreshToken) this.token.setRefreshToken(refreshToken)
  }
  
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeToken(token: any) {
    localStorage.setItem(this.JWT_TOKEN, token);
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  setUser(data): void {
    localStorage.setItem('user', JSON.stringify(data));
  }

  handleUser(data):void {
    this.setUser(data);
    const {token, refreshToken} = data
    if (token) this.token.set(token);
    if (refreshToken) this.token.setRefreshToken(refreshToken)
  }

  refreshAccessToken(handler: HttpHandler): Observable <any> {
    const authData = {
      refreshToken: this.getRefreshToken(), 
      token: this.getJwtToken()
    }
    return new HttpClient(handler).post<any>(`${this.URL}/auth/refresh`, authData)
  }
}
