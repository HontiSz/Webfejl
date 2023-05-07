import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Musics } from 'src/app/shared/model/Music';
import { MusicService } from 'src/app/shared/music.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/shared/modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loggedInUser?: firebase.default.User | null;
  music_array?: Array<Musics>;
  currentUsername?: string;
  music_dataSource: MatTableDataSource<Musics> = new MatTableDataSource<Musics>([]);
  headerRowDef: string[] = [];
  self?: boolean;


  constructor(
    private router: Router,
    private authService: AuthService,
    private musicService: MusicService,
    private http: HttpClient,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('list loaded');
    this.onSelf();
    this.authService.isLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    });
  }

  onSelf() {
    if (this.self) {
      this.self = false;

      let user = (JSON.parse(localStorage.getItem("user") as string));

      this.userService.getUserById(user.uid).subscribe(data => {
        this.currentUsername = data.data()?.username;

        if(!this.currentUsername) {
          return;
        }

        this.musicService.loadAllMusicMeta().subscribe((data: Array<Musics>) => {
          this.music_array = data;
          this.headerRowDef = ['artist', 'style', 'title', 'username', 'download', 'delete'];
          this.music_dataSource.data = this.music_array;
        }, error => {
          console.error(error);
        });
      });
    }
    else {
      this.self = true;

      let user = (JSON.parse(localStorage.getItem("user") as string));

      this.userService.getUserById(user.uid).subscribe(data => {
        this.currentUsername = data.data()?.username;

        if(!this.currentUsername) {
          return;
        }

        this.musicService.loadMusicByUsername(this.currentUsername).subscribe((data: Array<Musics>) => {
          this.music_array = data;
          this.headerRowDef = ['artist', 'style', 'title', 'username', 'download', 'delete'];
          this.music_dataSource.data = this.music_array;
        }, error => {
          console.error(error);
        });
      });
    }
  }

  onDownload(music: Musics) {
    this.musicService.downloadMusic(music).subscribe(link => {
      this.downloadFile(link, music.artist + ' - ' + music.title);
    }, error => {
      console.error(error);
    });
  }

  onDelete(music: Musics) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: { musicTitle: music.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.musicService.deleteMusic(music).subscribe(asd => {
          console.log('music deleted successfully');
        }, error => {
          console.error(error);
        });

        this.musicService.deleteMusicMeta(music).then(cred => {
          console.log('meta deleted successfully');
        }).catch(error => {
          console.error(error);
        });
      }
    });
  }

  downloadFile(url: string, filename: string): void {
    console.log(url);
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
  }

  onUpload() {
    this.router.navigate(['/pages/upload']);
  }

  onLogout() {
    this.authService.logout().then(cred => {
      this.router.navigate(['/main']);
    }).catch(error => {
      console.error(error);
    });
  }

}
