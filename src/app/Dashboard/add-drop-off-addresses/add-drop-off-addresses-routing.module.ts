import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDropOffAddressesPage } from './add-drop-off-addresses.page';

const routes: Routes = [
  {
    path: '',
    component: AddDropOffAddressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDropOffAddressesPageRoutingModule {}
