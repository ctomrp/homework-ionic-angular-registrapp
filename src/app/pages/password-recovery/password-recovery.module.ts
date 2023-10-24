import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PasswordRecoveryPage } from './password-recovery.page';
import { PasswordRecoveryPageRoutingModule } from './password-recovery-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordRecoveryPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [PasswordRecoveryPage],
})
export class PasswordRecoveryPageModule {}
