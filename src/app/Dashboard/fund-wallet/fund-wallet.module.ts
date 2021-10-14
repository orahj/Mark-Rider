import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundWalletPageRoutingModule } from './fund-wallet-routing.module';

import { FundWalletPage } from './fund-wallet.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundWalletPageRoutingModule,
    HeaderTwoComponentModule,
    NgxCleaveDirectiveModule
  ],
  declarations: [FundWalletPage]
})
export class FundWalletPageModule {}
