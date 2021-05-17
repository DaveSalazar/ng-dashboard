import { Observable } from "rxjs";
import { Login } from "src/app/models/Login";
import { User } from "src/app/models/User";

export abstract class IAuthService {
    
  abstract login(user: Login): Observable<User>;

  abstract logout(): void;

  abstract register(user: User): Observable<User>;

  abstract isLoggedIn(): boolean;

}