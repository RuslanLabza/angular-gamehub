import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import AuthenticationService from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")

    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ]))
  });

  constructor(public authenticationService: AuthenticationService) { }

  onSubmit() {
    this.authenticationService.authenticate(this.signInForm.value);
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
}
