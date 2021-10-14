import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPaymentPage } from './wallet-payment.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPaymentPageRoutingModule {}
