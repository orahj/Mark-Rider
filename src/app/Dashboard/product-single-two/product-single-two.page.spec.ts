import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductSingleTwoPage } from './product-single-two.page';

describe('ProductSingleTwoPage', () => {
  let component: ProductSingleTwoPage;
  let fixture: ComponentFixture<ProductSingleTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSingleTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSingleTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
