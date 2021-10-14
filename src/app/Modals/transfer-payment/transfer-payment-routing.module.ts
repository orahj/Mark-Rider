import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPaymentPage } from './transfer-payment.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPaymentPageRoutingModule {}
