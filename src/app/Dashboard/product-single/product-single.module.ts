import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSinglePageRoutingModule } from './product-single-routing.module';

import { ProductSinglePage } from './product-single.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSinglePageRoutingModule,
    HeaderTwoComponentModule,
  ],
  declarations: [ProductSinglePage]
})
export class ProductSinglePageModule {}
