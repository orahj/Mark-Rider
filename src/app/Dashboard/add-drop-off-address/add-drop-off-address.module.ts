import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDropOffAddressPageRoutingModule } from './add-drop-off-address-routing.module';

import { AddDropOffAddressPage } from './add-drop-off-address.page';
import { HeaderTwoComponentModule } from 'src/app/Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDropOffAddressPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [AddDropOffAddressPage]
})
export class AddDropOffAddressPageModule {}
