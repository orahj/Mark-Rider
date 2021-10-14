import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    HeaderTwoComponentModule,
    NgxCleaveDirectiveModule
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
