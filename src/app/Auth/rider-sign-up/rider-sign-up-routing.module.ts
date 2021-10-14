import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderSignUpPage } from './rider-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: RiderSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderSignUpPageRoutingModule {}
