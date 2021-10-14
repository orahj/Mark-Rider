import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './pay-routing.module';

import { PayPage } from './pay.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule,
    HeaderTwoComponentModule,
    NgxCleaveDirectiveModule
  ],
  declarations: [PayPage]
})
export class PayPageModule {}
