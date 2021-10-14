import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryDetailsPageRoutingModule } from './delivery-details-routing.module';

import { DeliveryDetailsPage } from './delivery-details.page';
import { HeaderComponentModule } from 'src/app/Partials/header/header.component.module';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';
import { HeaderTwoComponentModule } from 'src/app/Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryDetailsPageRoutingModule, 
    HeaderTwoComponentModule,
    NgxCleaveDirectiveModule
  ],
  declarations: [DeliveryDetailsPage]
})
export class DeliveryDetailsPageModule {}
