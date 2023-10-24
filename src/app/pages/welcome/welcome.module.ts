import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomePage } from './welcome.page';
import { WelcomePageRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    SharedModule,
  ],
  declarations: [WelcomePage],
})
export class WelcomePageModule {}
