import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderSignUpPage } from './rider-sign-up.page';

describe('RiderSignUpPage', () => {
  let component: RiderSignUpPage;
  let fixture: ComponentFixture<RiderSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
