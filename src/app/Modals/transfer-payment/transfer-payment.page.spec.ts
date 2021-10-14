import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferPaymentPage } from './transfer-payment.page';

describe('TransferPaymentPage', () => {
  let component: TransferPaymentPage;
  let fixture: ComponentFixture<TransferPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
