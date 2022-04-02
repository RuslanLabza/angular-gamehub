import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import AuthenticationService from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import IUser from '../../shared/interfaces/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: IUser = JSON.parse(sessionStorage.getItem("user")!);
  profileForm = new FormGroup({
    username: new FormControl(this.user.username!, Validators.compose([
      Validators.required,
      Validators.minLength(1)
    ])),
    email: new FormControl({ value: this.user.email!, disabled: true }),
    age: new FormControl(this.user.age!, Validators.compose([
      Validators.required,
      Validators.minLength(1)
    ]))
  });
  dataUpdated = false;

  constructor(
    private userService: UserService,
    public authenticationService: AuthenticationService
  ) { }

  updateData() {
    this.userService.updateProfile(this.profileForm.value).then(() => {
      this.dataUpdated = true;
      setTimeout((() => this.dataUpdated = false), 3000);
    });
  }

  get username() { return this.profileForm.get('username'); }
  get age() { return this.profileForm.get('age'); }
}
