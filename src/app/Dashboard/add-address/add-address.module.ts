import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAddressPageRoutingModule } from './add-address-routing.module';

import { AddAddressPage } from './add-address.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAddressPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAq84iD_-IGQEzZj5VET55rWthHgh75DSQ',
      libraries: ['places']
    }),
  ],
  declarations: [AddAddressPage]
})
export class AddAddressPageModule {}
