import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderFullfillmentThankyouPage } from './order-fullfillment-thankyou.page';

describe('OrderFullfillmentThankyouPage', () => {
  let component: OrderFullfillmentThankyouPage;
  let fixture: ComponentFixture<OrderFullfillmentThankyouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFullfillmentThankyouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFullfillmentThankyouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
