import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProfilePageRoutingModule } from './view-profile-routing.module';

import { ViewProfilePage } from './view-profile.page';
import { HeaderComponentModule } from '../../Partials/header/header.component.module';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProfilePageRoutingModule,
    HeaderComponentModule,
    ReactiveFormsModule
  ],
  declarations: [ViewProfilePage]
})
export class ViewProfilePageModule {}
