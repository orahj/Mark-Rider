import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDropOffAddressPage } from './add-drop-off-address.page';

describe('AddDropOffAddressPage', () => {
  let component: AddDropOffAddressPage;
  let fixture: ComponentFixture<AddDropOffAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDropOffAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDropOffAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
