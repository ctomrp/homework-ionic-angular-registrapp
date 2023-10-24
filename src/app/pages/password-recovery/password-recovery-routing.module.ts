import { NgModule } from '@angular/core';
import { PasswordRecoveryPage } from './password-recovery.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PasswordRecoveryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordRecoveryPageRoutingModule {}
