import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderDashboardPage } from './rider-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: RiderDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderDashboardPageRoutingModule {}
