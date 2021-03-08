import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuthService } from './IAuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements IAuthService {

  private _isLoggedIn: boolean = false; 

  constructor() { }

  login(user: { email: string; password: string; }): Observable<void> {
    this._isLoggedIn = true;
    return new Observable(subscriber => {
      subscriber.next();
    });
  }
  logout(): void {
    this._isLoggedIn = false;
    return;
  }
  register(user: { username: string; password: string; }): Observable<boolean> {
    return new Observable(subscriber => {
      subscriber.next(true);
    });
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  refreshToken() {
    throw new Error('Method not implemented.');
  }
  
  getJwtToken(): string {
    throw new Error('Method not implemented.');
  }
}
