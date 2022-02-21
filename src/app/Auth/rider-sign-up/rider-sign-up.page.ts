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
  model: RegistrationDto;
  ress: Result;
  public States : any
  public Countries : any;
  public submitted = false;
  constructor(
    private router: Router,
    private form: FormBuilder,
    private form2: FormBuilder,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.riderForm();
    this.getState();
    this.getCountries();
  }


  get i() { return this.individualFormData.controls; }

  riderForm(){
    this.individualFormData = this.form.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required,  Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
      phone: [null, [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
      address: [null, [Validators.required, Validators.maxLength(130)]],
      gender:[0,[Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      state:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      country:[0, [Validators.required, Validators.pattern(/^[1-9]\d*$/) ]],
      riderCardNo : ['', Validators.required],
      password: [null, [Validators.required, Validators.maxLength(130)]],
      confirm_password: [null, [Validators.required, Validators.maxLength(130)]],
    },
    );

    // this.individualFormData = this.form.group({
    //   firstName: ['', [Validators.required]],
    //   lastName: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
    //   // Phone Validation for Nigeria Numbers - Regex Pattern - ^[0]\\d{10}$ - verify it starts with 0 and total length is 11.
    //   phone: ['', [Validators.required, Validators.pattern('^[0]\\d{10}$')]],
    //   address: ['', [Validators.required]],
    //   gender:[0, [Validators.required]],
    //   state:[0, [Validators.required]],
    //   country:[0, [Validators.required]],
    //   password: ['', [Validators.required]],
    //   confirm_password: ['', [Validators.required]],
    // },
    // );
  }

  public submitIndividualForm(): void {
    this.submitted = true;
    if(this.individualFormData.invalid){
      return;
    }
    this.loading.showLoader();
      this.model = Object.assign({}, this.individualFormData.value);
      this.model.userTypes = 3;
      this.model.userCategory = 4;
      this.model.userName = this.model.email;
      this.authService.register(this.model).subscribe((res: any) =>{
        this.loading.closeLoader();
        this.alertService.showSuccessAlert(res.message)
      },error => {
        this.alertService.showErrorAlert(error.error.message);
      }
      );
  }

  public submitIndividualForm1(): void {
    this.loading.showLoader();
    if(this.individualFormData.valid) {
      this.model = Object.assign({}, this.individualFormData.value);

      this.model.deviceType = 1;
      this.authService.register(this.model).subscribe((res: any) =>{
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

  getState(){
    this.authService.getstate().subscribe((res : any) => {
      this.States = res.returnedObject.returnedObject;
    })
  }

  getCountries() {
    this.authService.getcountries().subscribe((res : any) => {
      this.Countries = res.returnedObject.returnedObject;
    })
  }
}
