import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpOptionsPageRoutingModule } from './sign-up-options-routing.module';

import { SignUpOptionsPage } from './sign-up-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpOptionsPageRoutingModule
  ],
  declarations: [SignUpOptionsPage]
})
export class SignUpOptionsPageModule {}
