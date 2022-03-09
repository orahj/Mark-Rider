import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { HeaderComponentModule } from '../../Partials/header/header.component.module';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderComponentModule,
    NgxCleaveDirectiveModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAq84iD_-IGQEzZj5VET55rWthHgh75DSQ',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
