import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderFullfillmentThankyouPage } from './order-fullfillment-thankyou.page';

const routes: Routes = [
  {
    path: '',
    component: OrderFullfillmentThankyouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderFullfillmentThankyouPageRoutingModule {}
