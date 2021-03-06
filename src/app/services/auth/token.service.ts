import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private BASE_URL = environment.BASE_URL + '/api/v1';

  constructor(
    private http: HttpClient
  ) { }

  set(token):void {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  setRefreshToken(refreshToken): void {
    localStorage.setItem('refreshToken', refreshToken)
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken')
  }

  removeRefreshToken(): void {
    localStorage.removeItem('refreshToken')
  }

  refreshAccessToken(handler: HttpHandler): Observable <any> {
    const authData = {
      refreshToken: this.getRefreshToken(), 
      token: this.get()
    }
    return new HttpClient(handler).post<any>(`${this.BASE_URL}/auth/refresh`, authData)
  }

  remove():void {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    return (token && token !== 'undefined') ? true: false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
