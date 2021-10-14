import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackOrdersDetailsPageRoutingModule } from './track-orders-details-routing.module';

import { TrackOrdersDetailsPage } from './track-orders-details.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackOrdersDetailsPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [TrackOrdersDetailsPage]
})
export class TrackOrdersDetailsPageModule {}
