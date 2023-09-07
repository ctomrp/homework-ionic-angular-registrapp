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
    ) { }

  isFieldInvalid(field: string){
    const control = this.loginForm.get(field);
    return control?.invalid && (control.dirty || control.touched || this.isSubmitted);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      console.log('mal');      
    }else{
      console.log('bien');
      
    }
  }

  doCancel(){
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
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Conectando...',
        duration: 3000,
      });

      loading.present();
      await loading.onDidDismiss();
      this.router.navigate(['/success-login']);
    }
  }

}
