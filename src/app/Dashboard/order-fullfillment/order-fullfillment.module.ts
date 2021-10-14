import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderFullfillmentPageRoutingModule } from './order-fullfillment-routing.module';

import { OrderFullfillmentPage } from './order-fullfillment.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderFullfillmentPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [OrderFullfillmentPage]
})
export class OrderFullfillmentPageModule {}
