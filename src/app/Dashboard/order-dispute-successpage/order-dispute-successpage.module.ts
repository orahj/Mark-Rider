import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDisputeSuccesspagePageRoutingModule } from './order-dispute-successpage-routing.module';

import { OrderDisputeSuccesspagePage } from './order-dispute-successpage.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDisputeSuccesspagePageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [OrderDisputeSuccesspagePage]
})
export class OrderDisputeSuccesspagePageModule {}
