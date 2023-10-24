import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuccessLoginPage } from './success-login.page';
import { SuccessLoginPageRoutingModule } from './success-login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessLoginPageRoutingModule,
    SharedModule,
  ],
  declarations: [SuccessLoginPage],
})
export class SuccessLoginPageModule {}
