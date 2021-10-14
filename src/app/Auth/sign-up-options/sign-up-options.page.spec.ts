import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpOptionsPage } from './sign-up-options.page';

describe('SignUpOptionsPage', () => {
  let component: SignUpOptionsPage;
  let fixture: ComponentFixture<SignUpOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
