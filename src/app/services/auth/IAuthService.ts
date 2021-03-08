import { Observable } from "rxjs";

export abstract class IAuthService {
    
  abstract login(user: { email: string; password: string }): Observable<void>;

  abstract logout(): void;

  abstract register(user: { username: string; password: string }): Observable<boolean>;

  abstract isLoggedIn();

  abstract refreshToken();

  abstract getJwtToken(): string;
}