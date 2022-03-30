import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackOrdersDetailsPageRoutingModule } from './track-orders-details-routing.module';

import { TrackOrdersDetailsPage } from './track-orders-details.page';
import { HeaderTwoComponentModule } from '../../Partials/header-two/header-two.component.module';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackOrdersDetailsPageRoutingModule,
    HeaderTwoComponentModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAq84iD_-IGQEzZj5VET55rWthHgh75DSQ',
      libraries: ['places']
    }),
  ],
  declarations: [TrackOrdersDetailsPage]
})
export class TrackOrdersDetailsPageModule {}
