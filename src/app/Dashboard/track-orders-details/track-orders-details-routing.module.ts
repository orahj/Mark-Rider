import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackOrdersDetailsPage } from './track-orders-details.page';

const routes: Routes = [
  {
    path: '',
    component: TrackOrdersDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackOrdersDetailsPageRoutingModule {}
