import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { HeaderComponentModule } from '../../Partials/header/header.component.module';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderComponentModule,
    NgxCleaveDirectiveModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
