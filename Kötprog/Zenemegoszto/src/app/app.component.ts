import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Zenemegoszto';
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem("user", JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem("user", JSON.stringify(null));
    });
  }
}
