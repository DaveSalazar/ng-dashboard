import { Observable } from "rxjs";

export interface IAuthService {
    
  login(user: { email: string; password: string }): Observable<void>;

  logout(): void;

  register(user: { username: string; password: string }): Observable<boolean>;

  isLoggedIn();

  refreshToken();

  getJwtToken(): string;
}