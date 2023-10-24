import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MessageComponent } from '../../components/message/message.component';
import { Router } from '@angular/router';

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
    private loginService: LoginService
  ) {}

  isFieldInvalid(field: string) {
    const control = this.loginForm.get(field);
    return (
      control?.invalid && (control.dirty || control.touched || this.isSubmitted)
    );
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    await this.doEnter();
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
        const username = this.loginForm.get('username')?.value.trim();
        const password = this.loginForm.get('password')?.value;

        const loading = await this.loadingCtrl.create({
          message: 'Conectando...',
        });
        await loading.present();

        const errorMessage = await this.loginService.signIn(username, password);

        if (!errorMessage) {
          this.router.navigate(['/success-login', username]);
        } else {
          this.messageComponent.header = 'Error';
          this.messageComponent.message = errorMessage;
          this.messageComponent.setOpen(true);
        }

        await loading.dismiss();
      }
    } catch (error) {
      this.messageComponent.header = 'Error';
      this.messageComponent.message =
        'Ocurrió un error desconocido, por favor intente más tarde.';
      this.messageComponent.setOpen(true);
    }
  }
}
