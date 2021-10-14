import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDisputePageRoutingModule } from './order-dispute-routing.module';

import { OrderDisputePage } from './order-dispute.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDisputePageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [OrderDisputePage]
})
export class OrderDisputePageModule {}
