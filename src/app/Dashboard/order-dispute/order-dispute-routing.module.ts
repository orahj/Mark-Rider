import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDisputePage } from './order-dispute.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDisputePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDisputePageRoutingModule {}
