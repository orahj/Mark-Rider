import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import { HeaderTwoComponentModule } from '../../../Partials/header-two/header-two.component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    HeaderTwoComponentModule
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
