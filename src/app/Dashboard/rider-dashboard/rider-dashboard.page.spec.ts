import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderDashboardPage } from './rider-dashboard.page';

describe('RiderDashboardPage', () => {
  let component: RiderDashboardPage;
  let fixture: ComponentFixture<RiderDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
