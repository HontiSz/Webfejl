import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection = 'Users';

  constructor(private afs: AngularFirestore) { }

  create(user: User) {
    return this.afs.collection<User>(this.collection).doc(user.id).set(user);
  }

  read(user: User) {
    return this.afs.collection<User>(this.collection).doc(user.id).get();
  }

  getUsernameById(id: string | undefined) : Promise<string | undefined>{
    return new Promise((resolve, reject) => {
      const user = this.afs.collection<User>(this.collection).doc(id).get();
      user.subscribe(asd => {
        console.log('username:\t' + asd.data()?.username);
        resolve(asd.data()?.username);
      }, error => {
        console.error(error);
        reject(error);
      });
    });
  }

  getUserById(id: string | undefined) {
    return this.afs.collection<User>(this.collection).doc(id).get();
  }

  /*delete(id: string) {
    return this.afs.collection(this.collection).doc(id).delete();
  }*/
}
