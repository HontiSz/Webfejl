import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private location: Location, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log('login loaded');
  }

  onLogin() {
    let email_value = this.email.value || '';
    let password_value = this.password.value || '';
    
    this.authService.login(email_value, password_value).then(cred => {
      console.log("User logged in successfully");
      this.router.navigate(['/pages/list']);
    }).catch(error => {
      console.error(error);
    });
  }

  onBack() {
    this.location.back();
  }
}
