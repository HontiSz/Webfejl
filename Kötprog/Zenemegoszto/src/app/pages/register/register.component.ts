import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordCheck: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private location: Location, private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    console.log('register loaded');
  }

  onRegistration() {
    let password_value = this.register.get('password')?.value || '';
    let passwordCheck_value = this.register.get('passwordCheck')?.value || '';

    if (password_value !== passwordCheck_value) {
      console.log("nem megegyező jelszavak")
      return;
    }

    let username_value = this.register.get('username')?.value || '';
    let email_value = this.register.get('email')?.value || '';

    this.authService.register(email_value, password_value).then(cred => {
      let user: User = {
        id: cred.user?.uid as string,
        username: username_value,
        email: email_value
      };

      this.userService.create(user).then(_ => {
        console.log('User added successfully');
      }).catch(error => {
        console.error(error);
      });

      this.router.navigate(['/pages/login']);
    }).catch(error => {
      console.log(error);
    });
  }

  onBack() {
    this.location.back();
  }
}
