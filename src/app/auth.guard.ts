import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'; // Importa take y map de RxJS

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.loginService.getAuthState().pipe(
      take(1), // Toma solo un valor del observable
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
