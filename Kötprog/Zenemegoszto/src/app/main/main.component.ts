import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('main loaded');
  }

  onLogin() {
    this.router.navigate(['/pages/login']);
  }

  onRegistration() {
    this.router.navigate(['/pages/register']);
  }

}
