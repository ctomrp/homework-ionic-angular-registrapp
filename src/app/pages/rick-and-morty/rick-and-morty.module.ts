import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RickAndMortyPage } from './rick-and-morty.page';
import { RickAndMortyPageRoutingModule } from './rick-and-morty-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RickAndMortyPageRoutingModule,
    SharedModule,
  ],
  declarations: [RickAndMortyPage],
})
export class RickAndMortyPageModule {}
