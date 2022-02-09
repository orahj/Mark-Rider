import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderTwoComponent } from './header-two.component';

@NgModule({
  imports: [
  ],
  declarations: [
    HeaderTwoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HeaderTwoComponent
  ]
})

export class HeaderTwoComponentModule { }