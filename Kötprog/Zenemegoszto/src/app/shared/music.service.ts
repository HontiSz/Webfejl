import { Injectable } from '@angular/core';
import { Music, Musics } from './model/Music';
import { User } from './model/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  collectionName = 'Music';
  storageName = 'Musics'

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private userService: UserService
  ) { }

  loadAllMusicMeta(): Observable<Array<Musics>> {
    return this.afs.collection<Musics>(this.collectionName).valueChanges();
  }

  downloadMusic(music: Musics) {
    return this.storage.ref(this.storageName + '/' + music.title).getDownloadURL();
  }

  deleteMusic(music: Musics) {
    return this.storage.ref(this.storageName + '/' + music.title).delete();
  }

  deleteMusicMeta(music: Musics) {
    return this.afs.collection(this.collectionName).doc(music.artist + ' - ' + music.title).delete();
  }

  addMusic(music: Music) {
    let currentUser = JSON.parse(localStorage.getItem('user') as string);
    let username: string | undefined;
    this.userService.getUsernameById(currentUser.uid).then(data => {
      username = data;
      const m_url = this.storageName + '/' + music.name;
      const musics: Musics = {
        artist: music.artist,
        music_url: m_url,
        style: music.style,
        title: music.name,
        username: username
      };

      this.afs.collection<Musics>(this.collectionName).doc(musics.artist + ' - ' + musics.title).set(musics).then(asd => {
        console.log("music added successfully");
      }).catch(error => {
        console.error(error);
      });

      const task = this.storage.upload(m_url, music.file);

      task.snapshotChanges().subscribe(
        (snapshot) => {
          if (snapshot) {
            console.log('upload is ' + Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + '% done');
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          console.log("music uploaded");
        }
      )

    }).catch(error => {
      console.error(error);
    });
  }
}
