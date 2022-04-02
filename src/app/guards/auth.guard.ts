import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  routeURL: string;

  constructor(
    private router: Router
  ) {
    this.routeURL = this.router.url;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!JSON.parse(sessionStorage.getItem("isAuthenticated")!) && this.routeURL !== "login") {
      this.routeURL = "login";
      this.router.navigate(["login"]);
      return false;

    } else {
      this.routeURL = this.router.url;
      return true;
    }
  }
}
