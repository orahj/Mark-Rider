import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderFullfillmentPage } from './order-fullfillment.page';

const routes: Routes = [
  {
    path: '',
    component: OrderFullfillmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderFullfillmentPageRoutingModule {}
