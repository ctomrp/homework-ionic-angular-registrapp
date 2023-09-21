import { User } from './../../interfaces/user';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageComponent } from '../../components/message/message.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  loginForm = this.fb.group({
    id: null,
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth
  ) {}

  isFieldInvalid(field: string) {
    const control = this.loginForm.get(field);
    return (
      control?.invalid && (control.dirty || control.touched || this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;
  }

  doCancel() {
    this.router.navigate(['/welcome']);
  }

  ionViewWillEnter() {
    this.loginForm.reset();
    this.isSubmitted = false;
  }

  async doEnter() {
    try {
      if (this.loginForm.invalid) {
        this.messageComponent.header = 'Atención';
        this.messageComponent.message = 'Debe completar todos los campos.';
        this.messageComponent.setOpen(true);
      } else {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;

        const loading = await this.loadingCtrl.create({
          message: 'Conectando...',
        });
        await loading.present();

        try {
          await this.afAuth.signInWithEmailAndPassword(username!, password!);
          this.router.navigate(['/success-login', username]);
          await loading.dismiss();
        } catch (error) {
          this.messageComponent.header = 'Error';

          if (error.code === 'auth/network-request-failed') {
            this.messageComponent.message =
              'Error de conexión, por favor intente más tarde.';
          } else {
            this.messageComponent.message =
              'Usuario y/o contraseña incorrecta.';
          }
          this.messageComponent.setOpen(true);
          await loading.dismiss();
        }
      }
    } catch (error) {
      this.messageComponent.header = 'Error';
      this.messageComponent.message =
        'Ocurrió un error desconocido, por favor intente más tarde.';
      this.messageComponent.setOpen(true);
    }
  }
}
