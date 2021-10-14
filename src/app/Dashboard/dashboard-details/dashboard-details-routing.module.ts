import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDetailsPage } from './dashboard-details.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDetailsPageRoutingModule {}
