import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDropOffAddressPage } from './add-drop-off-address.page';

const routes: Routes = [
  {
    path: '',
    component: AddDropOffAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDropOffAddressPageRoutingModule {}
