import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletPaymentPage } from './wallet-payment.page';

describe('WalletPaymentPage', () => {
  let component: WalletPaymentPage;
  let fixture: ComponentFixture<WalletPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
