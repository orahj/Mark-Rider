import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderFullfillmentPage } from './order-fullfillment.page';

describe('OrderFullfillmentPage', () => {
  let component: OrderFullfillmentPage;
  let fixture: ComponentFixture<OrderFullfillmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFullfillmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFullfillmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
