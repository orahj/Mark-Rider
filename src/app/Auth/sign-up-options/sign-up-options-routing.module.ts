import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpOptionsPage } from './sign-up-options.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpOptionsPageRoutingModule {}
