import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../Services/loading/loading.service';
import { RegistrationDto } from 'src/app/_model/registrationDto';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { Result } from 'src/app/_model/result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  individualFormData: FormGroup;
  companyFormData: FormGroup;
  smeFormData : FormGroup;
  segmentModel = 'individual';
  model: RegistrationDto;
  ress: Result;
  submitted = false;
  submitted1 = false;
  submitted2 = false;
  public States : any;
  public Countries : any; 
  constructor(
    private router: Router,
    private form: FormBuilder,
    private form2: FormBuilder,
    private form3 : FormBuilder,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.companyForm();
    this.individualForm();
  }

  segmentChanged(segment){
    // reset input fileds on segment change
  }

  get i() { return this.individualFormData.controls; }
  get c() { return this.companyFormData.controls; }
  get s() { return this.smeFormData.controls; }

  public submitIndividualForm(): void {
    this.submitted = true;
    if(this.individualFormData.invalid){
      return;
    }
    // this.loading.showLoader();
    console.table(this.individualFormData.value);
    if(this.individualFormData.valid) {
      this.model = Object.assign({}, this.individualFormData.value);
      this.model.deviceType = 1;
      this.model.userTypes = 4;
      this.model.userCategory = 1;
      this.authService.register(this.model).subscribe((res: Result) =>{
        this.ress = res;
        this.loading.closeLoader();
        // if(res.isSuccessful) {
        //   this.loading.closeLoader();
        //   this.router.navigate(['/verify-email']);
        // }
        // else {
        //   this.loading.closeLoader();
        //   this.alertService.showErrorAlert(res.message);
        // }
      });
    // this.loading.showLoader();
    // this.loading.closeLoader();
  }
  }
  public submitCompanyForm(): void {
    this.submitted = true;
    if(this.companyFormData.invalid){
      return;
    }
    console.table(this.companyFormData.value);
    this.model = Object.assign({}, this.companyFormData.value);
    this.model.userTypes = 4;
    this.model.userCategory = 3;
    this.authService.register(this.model).subscribe((res: Result) =>{
      this.ress = res;
      this.loading.closeLoader();
    });
  }

  public submitSmeForm(): void {
    this.submitted = true;
    if(this.smeFormData.invalid){
      return;
    }
    this.model = Object.assign({}, this.smeFormData.value);
    console.table(this.smeFormData.value);
    this.model.userTypes = 4;
    this.model.userCategory = 2;
    this.authService.register(this.model).subscribe((res: Result) =>{
      this.ress = res;
      this.loading.closeLoader();
    });
  }

  individualForm() {
    this.individualFormData = this.form.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      phone: [null, [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: [null, [Validators.required]],
      gender:[0, [Validators.required]],
      state:[0, [Validators.required]],
      country:[0, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    },
    );
  }

  companyForm() {
    this.companyFormData = this.form2.group({
      company_name: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      state:[0, [Validators.required]],
      country:[0, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    });
  }

  smeForm() {
    this.smeFormData = this.form3.group({
      businessName: [null, [Validators.required]],
      businessNumber: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      state:[0, [Validators.required]],
      country:[0, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    });
  }

  getState(){
    this.authService.getstate().subscribe((res) => {
      console.log(res);
    })
  }

  getCountries() {
    this.authService.getcountries().subscribe((res) => {
      console.log(res);
    })
  }

}
