import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDisputeSuccesspagePage } from './order-dispute-successpage.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDisputeSuccesspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDisputeSuccesspagePageRoutingModule {}
