import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletTransactionPageRoutingModule } from './wallet-transaction-routing.module';

import { WalletTransactionPage } from './wallet-transaction.page';
import { HeaderTwoComponentModule } from 'src/app/Partials/header-two/header-two.component.module';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletTransactionPageRoutingModule,
    HeaderTwoComponentModule,
    BarRatingModule
  ],
  declarations: [WalletTransactionPage]
})
export class WalletTransactionPageModule {}
