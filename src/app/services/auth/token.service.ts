import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

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
