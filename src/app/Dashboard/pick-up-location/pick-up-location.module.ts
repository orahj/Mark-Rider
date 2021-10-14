import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickUpLocationPageRoutingModule } from './pick-up-location-routing.module';

import { PickUpLocationPage } from './pick-up-location.page';
import { HeaderComponentModule } from 'src/app/Partials/header/header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickUpLocationPageRoutingModule,
    HeaderComponentModule,
  ],
  declarations: [PickUpLocationPage]
})
export class PickUpLocationPageModule {}
