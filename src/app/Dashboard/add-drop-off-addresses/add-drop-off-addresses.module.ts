import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDropOffAddressesPageRoutingModule } from './add-drop-off-addresses-routing.module';

import { AddDropOffAddressesPage } from './add-drop-off-addresses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDropOffAddressesPageRoutingModule
  ],
  declarations: [AddDropOffAddressesPage]
})
export class AddDropOffAddressesPageModule {}
