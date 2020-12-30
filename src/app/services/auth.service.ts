import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  login(user: { email: string; password: string }): Observable<void> {
    return this.http.post<any>(`${environment.BASE_URL}/auth/login`, user).pipe(
      tap((response) => this.doLoginUser(response)),
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
      .post<any>(`${environment.BASE_URL}/auth/register`, user)
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
      .post<any>(`${environment.BASE_URL}/auth/refresh`, {
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
    this.profileService.saveProfile(response.profile);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
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
    // localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
