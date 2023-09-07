import { User } from './../../interfaces/user';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  alumnos: User[] = [
    { id: 1, name: 'Bastian', password: 'Bastian' },
    { id: 2, name: 'Cristian', password: 'Cristian' },
    { id: 3, name: 'Luis', password: 'Luis' },
  ];
  usuarioCoincide() {
    for (var i = 0; i < this.alumnos.length; i++) {
      if (
        this.alumnos[i].name.toLocaleLowerCase() === this.loginForm.get('username')?.value?.toLocaleLowerCase().trim() &&
        this.alumnos[i].password === this.loginForm.get('password')?.value
      ) {
        console.log('entró');
        return this.loginForm.get('username')?.value;
      }
    }
    return false;
  }

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
    private loadingCtrl: LoadingController
  ) {}

  isFieldInvalid(field: string) {
    const control = this.loginForm.get(field);
    return (
      control?.invalid && (control.dirty || control.touched || this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      console.log('mal');
    } else {
      console.log('bien');
    }
  }

  doCancel() {
    this.router.navigate(['/welcome']);
  }

  ionViewWillEnter() {
    this.loginForm.reset();
    this.isSubmitted = false;
  }

  async doEnter() {
    if (this.loginForm.invalid) {
      this.messageComponent.header = 'Atención';
      this.messageComponent.message = 'Debe completar todos los campos.';
      this.messageComponent.setOpen(true);
    } else if (this.usuarioCoincide() !== false) {
      const loading = await this.loadingCtrl.create({
        message: 'Conectando...',
        duration: 3000,
      });

      loading.present();
      await loading.onDidDismiss();
      this.router.navigate(['/success-login', this.loginForm.get('username')?.value]);
    } else {
      this.messageComponent.header = 'Error';
      this.messageComponent.message = 'Usuario y/o contraseña incorrecta.';
      this.messageComponent.setOpen(true);
    }
  }
}
