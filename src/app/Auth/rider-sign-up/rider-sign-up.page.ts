import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { RegistrationDto } from 'src/app/_model/registrationDto';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-rider-sign-up',
  templateUrl: './rider-sign-up.page.html',
  styleUrls: ['./rider-sign-up.page.scss'],
})
export class RiderSignUpPage implements OnInit {

  individualFormData: FormGroup;
  companyFormData: FormGroup;
  segmentModel = 'individual';
  model: RegistrationDto;
  ress: Result;
  constructor(
    private router: Router,
    private form: FormBuilder,
    private form2: FormBuilder,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.individualFormData = this.form.group({
      firstName: [null, [Validators.required, Validators.maxLength(10)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      phone: [null, [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: [null, [Validators.required, Validators.maxLength(130)]],
      idnumber:[null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(130)]],
      confirm_password: [null, [Validators.required, Validators.maxLength(130)]],
    },
    );
  }

  segmentChanged(segment){
    // reset input fileds on segment change
  }

  public submitIndividualForm(): void {
    this.loading.showLoader();
    console.table(this.individualFormData.value);
    if(this.individualFormData.valid) {
      this.model = Object.assign({}, this.individualFormData.value);
      this.model.roles = ['user'];
      this.model.deviceType = 1;
      this.authService.register(this.model).subscribe((res: Result) =>{
        debugger;
        this.ress = res;
        if(res.isSuccessful) {
          this.loading.closeLoader();
          this.router.navigate(['/verify-email']);
        }
        else {
          this.loading.closeLoader();
          this.alertService.showErrorAlert(res.message);
        }
      });
    // this.loading.showLoader();
    // this.loading.closeLoader();
  }
  }
}
