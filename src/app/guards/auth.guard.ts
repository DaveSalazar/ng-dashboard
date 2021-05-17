import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot,
  RouterStateSnapshot, 
  UrlTree, 
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthService } from '../services/auth/IAuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: IAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/authentication']);
      }
      return this.authService.isLoggedIn();
  }
  
}
