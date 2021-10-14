import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDropOffAddressesPage } from './add-drop-off-addresses.page';

describe('AddDropOffAddressesPage', () => {
  let component: AddDropOffAddressesPage;
  let fixture: ComponentFixture<AddDropOffAddressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDropOffAddressesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDropOffAddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
