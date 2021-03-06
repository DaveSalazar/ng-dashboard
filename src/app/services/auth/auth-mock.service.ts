import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthService } from './IAuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements IAuthService {


  constructor() { }

  login(user: { email: string; password: string; }): Observable<void> {
    throw new Error('Method not implemented.');
  }
  logout(): void {
    throw new Error('Method not implemented.');
  }
  register(user: { username: string; password: string; }): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  isLoggedIn() {
    throw new Error('Method not implemented.');
  }

  refreshToken() {
    throw new Error('Method not implemented.');
  }
  
  getJwtToken(): string {
    throw new Error('Method not implemented.');
  }
}
