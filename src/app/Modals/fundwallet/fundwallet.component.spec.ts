import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundwalletComponent } from './fundwallet.component';

describe('FundwalletComponent', () => {
  let component: FundwalletComponent;
  let fixture: ComponentFixture<FundwalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundwalletComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
