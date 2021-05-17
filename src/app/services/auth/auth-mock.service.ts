import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { IAuthService } from './IAuthService';
import { v4 as uuidv4 } from "uuid";
import { Login } from 'src/app/models/Login';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements IAuthService {

  private users: BehaviorSubject<User[]> = new BehaviorSubject([
    {
      id: uuidv4(),
      email: 'admin@test.com',
      profile: {
        id: uuidv4(),
        firstName: 'John',
        lastName: 'Doe',
      }
    }
  ]);
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false); 

  constructor() { }

  login(user: Login): Observable<User> {
    return this.users.asObservable().pipe(
      map((users) => users.find( el => el.email === user.email)),
      tap( (user) => {
        if(!user) {
          const error = {code: "invalid_credentials", message: "credentials are not valid"}
          throw { error }
        } else {
          this._isLoggedIn.next(true);
          console.log("logged in")
        }
      })
    )
  }


  register(user: User): Observable<User> {

    const currentUsers = this.users.getValue()
    currentUsers.push(user)
    this.users.next(currentUsers)
    this._isLoggedIn.next(true);

    return new Observable(subscriber => {
      subscriber.next(user);
    });
  }

  logout(): void {
    this._isLoggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn.getValue()
  }
}
