import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderDisputePage } from './order-dispute.page';

describe('OrderDisputePage', () => {
  let component: OrderDisputePage;
  let fixture: ComponentFixture<OrderDisputePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDisputePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDisputePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
