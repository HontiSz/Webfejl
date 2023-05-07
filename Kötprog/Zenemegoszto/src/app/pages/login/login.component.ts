import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private location: Location, 
    private router: Router, 
    private authService: AuthService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    console.log('login loaded');
  }

  onLogin() {
    let email_value = this.email.value || '';
    let password_value = this.password.value || '';

    if(email_value == '' || password_value == '') {
      this.snackBar.open('Minden mezőt kötelező kitölteni!', 'Bezár', {
        verticalPosition: 'top'
      });
      return;
    }
    
    this.authService.login(email_value, password_value).then(cred => {
      console.log("User logged in successfully");
      this.router.navigate(['/pages/list']);
    }).catch(error => {
      this.snackBar.open(error, 'Bezár', {
        verticalPosition: 'top'
      });
      console.error(error);
    });
  }

  onBack() {
    this.location.back();
  }
}
