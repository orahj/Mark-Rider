import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSingleTwoPage } from './product-single-two.page';

const routes: Routes = [
  {
    path: '',
    component: ProductSingleTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSingleTwoPageRoutingModule {}
