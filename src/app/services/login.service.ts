import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public afAuth: AngularFireAuth) {}

  getAuthState(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => !!user));
  }

  async signIn(username: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(username, password);
      return null;
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        return 'Error de conexión, por favor intente más tarde';
      } else {
        return 'Usuario y/o contraseña incorrecta.';
      }
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      return null;
    } catch (error) {
      return 'Error al cerrar sesión.';
    }
  }

  async recoverPassword(password: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(password);
      return null;
    } catch (error) {
      return 'Error al recuperar la contraseña.';
    }
  }
}
