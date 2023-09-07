import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageComponent } from 'src/app/components/message/message.component';

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
    private router: Router  
  ) { }

  isFieldInvalid(field: string){
    const control = this.passwordRecoveryForm.get(field);
    return control?.invalid && (control.dirty || control.touched || this.isSubmitted);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if(this.passwordRecoveryForm.invalid){
      console.log('mal');      
    }else{
      console.log('bien');
      
    }
  }

  ionViewWillEnter() {
    this.passwordRecoveryForm.reset();
    this.isSubmitted = false;
  }

  async doEnter() {
    if (this.passwordRecoveryForm.invalid) {
      this.messageComponent.header = 'Atención';
      this.messageComponent.message = 'Ingrese su correo electrónico.';
      this.messageComponent.setOpen(true);
    } else {
      console.log('Enviando correo');
      this.router.navigate(['/login']);
    }
  }

  doCancel(){
    this.router.navigate(['/welcome']);
  }
}
