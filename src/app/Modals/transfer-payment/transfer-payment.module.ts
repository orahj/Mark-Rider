import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPaymentPageRoutingModule } from './transfer-payment-routing.module';

import { TransferPaymentPage } from './transfer-payment.page';
import { HeaderTwoComponentModule } from 'src/app/Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPaymentPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [TransferPaymentPage]
})
export class TransferPaymentPageModule {}
