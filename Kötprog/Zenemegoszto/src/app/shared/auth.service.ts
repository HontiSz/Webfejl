import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isLoggedIn() {
    return this.auth.user;
  }

  /*delete(id: string) {
    this.auth.currentUser.then(user => {
      user?.delete().then(asd => {
        console.log("user deleted successfully");
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }*/
}
