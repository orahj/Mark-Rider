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
    this.smeForm();
    this.getCountries();
    this.getState();
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
    this.loading.showLoader();
    console.table(this.individualFormData.value);
      this.model = Object.assign({}, this.individualFormData.value);
      this.model.userTypes = 4;
      this.model.userCategory = 1;
      this.model.userName = this.model.email;
      console.log('Model', this.model);
      this.authService.register(this.model).subscribe((res: any) =>{
        this.loading.closeLoader();
        this.alertService.showSuccessAlert(res.message)
      },error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      });

  }

  public submitCompanyForm(): void {
    this.submitted1 = true;
    if(this.companyFormData.invalid){
      return;
    }
    console.table(this.companyFormData.value);
    this.model = Object.assign({}, this.companyFormData.value);
    this.model.userTypes = 4;
    this.model.userCategory = 3;
    this.model.userName = this.model.email;
    this.loading.showLoader();
    this.authService.register(this.model).subscribe((res: any) =>{
      this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message);
    }, error => {
      this.alertService.showErrorAlert(error.error.message);
    });
  }

  public submitSmeForm(): void {
    this.submitted2 = true;
    if(this.smeFormData.invalid){
      return;
    }
    this.model = Object.assign({}, this.smeFormData.value);
    console.table(this.smeFormData.value);
    this.model.userTypes = 4;
    this.model.userCategory = 2;
    this.model.userName = this.model.email;
    this.loading.showLoader();
    this.authService.register(this.model).subscribe((res: any) =>{
      this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message);
    }, error => {
      this.loading.closeLoader();
      this.alertService.showErrorAlert(error.error.message);
    });
  }

  individualForm() {
    this.individualFormData = this.form.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      phone: ['', [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: ['', [Validators.required]],
      gender:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      state:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      country:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
    );
  }

  companyForm() {
    this.companyFormData = this.form2.group({
      companyName: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      rcNumber:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      state:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      country:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      phone: [null, [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    });
  }

  smeForm() {
    this.smeFormData = this.form3.group({
      businessName: ['', [Validators.required]],
      businessNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      state:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      country:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      phone: ['', [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  getState(){
    this.authService.getstate().subscribe((res : any) => {
      if(res.isSuccessful === true){
        this.States = res.returnedObject.returnedObject;
      }
    })
  }

  getCountries() {
    this.authService.getcountries().subscribe((res : any) => {
      if(res.isSuccessful == true){
        this.Countries = res.returnedObject.returnedObject;
      }
    })
  }

}
