import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {
  bejelentkezve = false;
  intervalId: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(felhasznalo => {
      this.bejelentkezve = !!felhasznalo;
  
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    console.log('NavbarComponent megszűnt');
  }

  kijelentkezes() {
    this.authService.logout();
  }
}
