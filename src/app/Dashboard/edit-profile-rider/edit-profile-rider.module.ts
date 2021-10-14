import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileRiderPageRoutingModule } from './edit-profile-rider-routing.module';

import { EditProfileRiderPage } from './edit-profile-rider.page';
import { HeaderTwoComponentModule } from 'src/app/Partials/header-two/header-two.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileRiderPageRoutingModule,
    HeaderTwoComponentModule,
    ReactiveFormsModule
  ],
  declarations: [EditProfileRiderPage]
})
export class EditProfileRiderPageModule {}
