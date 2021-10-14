import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPaymentPageRoutingModule } from './wallet-payment-routing.module';

import { WalletPaymentPage } from './wallet-payment.page';
import { HeaderTwoComponentModule } from 'src/app/Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPaymentPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [WalletPaymentPage]
})
export class WalletPaymentPageModule {}
