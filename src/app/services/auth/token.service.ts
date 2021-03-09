import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  setToken(token): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
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

  removeToken(): void {
    localStorage.removeItem('token');
  }

  removeTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  }

}
