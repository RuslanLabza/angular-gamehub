import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import ISignInData from 'src/app/shared/interfaces/ISignInData';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export default class AuthenticationService {
  dataIsNotValid: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    sessionStorage.setItem("isAuthenticated", 'false');
  }

  authenticate(signInData: ISignInData): void {
    this.userService.getUserByEmail(signInData.email).subscribe((user) => {

      if (user?.password === signInData.password) {
        sessionStorage.setItem("isAuthenticated", 'true');
        sessionStorage.setItem("user", `${JSON.stringify(user)}`);
        this.router.navigate(["library"]);
        return;
      }

      this.dataIsNotValid = true;
      setTimeout((() => this.dataIsNotValid = false), 3000);
    })
  }

  logout() {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
