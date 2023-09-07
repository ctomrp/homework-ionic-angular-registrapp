import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessLoginPage } from './success-login.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessLoginPageRoutingModule {}
