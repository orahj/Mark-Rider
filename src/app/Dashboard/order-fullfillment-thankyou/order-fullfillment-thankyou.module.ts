import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderFullfillmentThankyouPageRoutingModule } from './order-fullfillment-thankyou-routing.module';

import { OrderFullfillmentThankyouPage } from './order-fullfillment-thankyou.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderFullfillmentThankyouPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [OrderFullfillmentThankyouPage]
})
export class OrderFullfillmentThankyouPageModule {}
