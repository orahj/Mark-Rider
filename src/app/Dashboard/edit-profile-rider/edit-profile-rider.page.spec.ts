import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProfileRiderPage } from './edit-profile-rider.page';

describe('EditProfileRiderPage', () => {
  let component: EditProfileRiderPage;
  let fixture: ComponentFixture<EditProfileRiderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileRiderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileRiderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
