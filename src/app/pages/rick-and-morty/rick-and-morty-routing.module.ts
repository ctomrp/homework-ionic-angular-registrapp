import { NgModule } from '@angular/core';
import { RickAndMortyPage } from './rick-and-morty.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RickAndMortyPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RickAndMortyPageRoutingModule {}
