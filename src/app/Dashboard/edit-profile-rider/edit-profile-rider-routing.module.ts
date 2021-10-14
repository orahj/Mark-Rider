import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileRiderPage } from './edit-profile-rider.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileRiderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileRiderPageRoutingModule {}
