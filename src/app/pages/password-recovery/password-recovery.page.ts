import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MessageComponent } from 'src/app/components/message/message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  passwordRecoveryForm = this.fb.group({
    id: null,
    email: ['', [Validators.required, Validators.email]],
  });
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  isFieldInvalid(field: string) {
    const control = this.passwordRecoveryForm.get(field);
    return (
      control?.invalid && (control.dirty || control.touched || this.isSubmitted)
    );
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.passwordRecoveryForm.invalid) {
    } else {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.passwordRecoveryForm.reset();
    this.isSubmitted = false;
  }

  async doEnter() {
    try {
      if (this.passwordRecoveryForm.invalid) {
        this.messageComponent.header = 'Atención';
        this.messageComponent.message = 'Debe completar todos los campos.';
        this.messageComponent.setOpen(true);
      } else {
        const email = this.passwordRecoveryForm.get('email')?.value.trim();

        this.messageComponent.header = 'Atención';
        this.messageComponent.message =
          'Se le enviará un enlace de recuperación a su correo';
        this.messageComponent.setOpen(true);

        const errorMessage = await this.loginService.recoverPassword(email);

        if (!errorMessage) {
          this.router.navigate(['/login']);
        } else {
          this.messageComponent.header = 'Error';
          this.messageComponent.message = errorMessage;
          this.messageComponent.setOpen(true);
        }
      }
    } catch (error) {
      this.messageComponent.header = 'Error';
      this.messageComponent.message =
        'Ocurrió un error desconocido, por favor intente más tarde.';
      this.messageComponent.setOpen(true);
    }
  }

  doCancel() {
    this.router.navigate(['/welcome']);
  }
}
