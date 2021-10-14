import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SectionHeaderComponent],
  declarations: [SectionHeaderComponent]
})
export class SectionHeaderModule { }
