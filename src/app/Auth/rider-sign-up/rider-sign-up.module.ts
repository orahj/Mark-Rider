import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderSignUpPageRoutingModule } from './rider-sign-up-routing.module';

import { RiderSignUpPage } from './rider-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderSignUpPageRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [RiderSignUpPage]
})
export class RiderSignUpPageModule {}
