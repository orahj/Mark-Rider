import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersDetailsPageRoutingModule } from './orders-details-routing.module';

import { OrdersDetailsPage } from './orders-details.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersDetailsPageRoutingModule,
    HeaderTwoComponentModule,
    BarRatingModule
  ],
  declarations: [OrdersDetailsPage]
})
export class OrdersDetailsPageModule {}
