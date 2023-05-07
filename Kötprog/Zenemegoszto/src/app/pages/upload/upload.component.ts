import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Music } from '../../shared/model/Music';
import { MusicService } from 'src/app/shared/music.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  styles = ['Pop', 'J-pop', 'Kawaii metal', 'Blues-rock', 'Paródia zene', 'Country rock', 'Techno', 
          'Népi', 'Trap', 'Jazz', 'Pop-rock', 'Alternatív rock', 'Heavy metal', 'Power metal', 'Nu Metal', 'Rap-metal', 
          'Black metal', 'Death metal', 'Metalcore', 'Rap-rock', 'Rock and roll', 'Klasszikus zene', 'Egyéb'].sort();
  loggedInUser?: firebase.default.User | null;
  music = new FormGroup({
    name: new FormControl(''),
    style: new FormControl(''),
    artist: new FormControl(''),
    file: new FormControl(null)
  });

  constructor(private location: Location, private router: Router, private authService: AuthService, private musicService: MusicService) { }

  ngOnInit(): void {
    console.log('upload loaded');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.music.get('file')?.setValue(file);
  }

  saveMusic() {
    const name = this.music.get('name')?.value || '';
    const style = this.music.get('style')?.value || '';
    const artist = this.music.get('artist')?.value || '';
    const file = this.music.get('file')?.value || null;

    const music: Music = {
      name: name,
      style: style,
      artist: artist,
      file: file
    };

    if(music.name === '' || music.style === '' || music.artist === '' || !music.file) {
      console.log('üres mezők');
      //TODO: felugró ablak
      return 
    }

    if(music.file.name.split('.')[music.file.name.split('.').length - 1] !== 'mp3') {
      console.log('nem jó formátum');
      //TODO: felugró ablak
      return
    }

    this.musicService.addMusic(music);
  }

  onCancel() {
    this.location.back();
  }
}
