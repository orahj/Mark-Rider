import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderDashboardPageRoutingModule } from './rider-dashboard-routing.module';

import { RiderDashboardPage } from './rider-dashboard.page';
import { HeaderComponentModule } from 'src/app/Partials/header/header.component.module';
import { SectionHeaderModule } from 'src/app/Partials/section-header/section-header.module';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderDashboardPageRoutingModule,
    HeaderComponentModule,
    SectionHeaderModule,
    BarRatingModule
  ],
  declarations: [RiderDashboardPage]
})
export class RiderDashboardPageModule {}
