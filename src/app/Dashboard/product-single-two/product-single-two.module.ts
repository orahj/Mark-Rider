import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSingleTwoPageRoutingModule } from './product-single-two-routing.module';

import { ProductSingleTwoPage } from './product-single-two.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSingleTwoPageRoutingModule,
    HeaderTwoComponentModule,
    BarRatingModule
  ],
  declarations: [ProductSingleTwoPage]
})
export class ProductSingleTwoPageModule {}
