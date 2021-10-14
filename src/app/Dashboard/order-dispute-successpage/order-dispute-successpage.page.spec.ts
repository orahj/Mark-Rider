import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderDisputeSuccesspagePage } from './order-dispute-successpage.page';

describe('OrderDisputeSuccesspagePage', () => {
  let component: OrderDisputeSuccesspagePage;
  let fixture: ComponentFixture<OrderDisputeSuccesspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDisputeSuccesspagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDisputeSuccesspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
