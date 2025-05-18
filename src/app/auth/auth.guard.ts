import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private auth = inject(Auth);
  private router = inject(Router);

  canActivate() {
    return user(this.auth).pipe(
      take(1),
      map(u => {
        if (u) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
