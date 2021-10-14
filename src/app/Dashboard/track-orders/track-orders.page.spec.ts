import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackOrdersPage } from './track-orders.page';

describe('TrackOrdersPage', () => {
  let component: TrackOrdersPage;
  let fixture: ComponentFixture<TrackOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
