import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { ChangePasswordDto } from 'src/app/_model/changePasswordDto';
import { Result } from 'src/app/_model/result';
import { UserInfoResponseDto } from 'src/app/_model/userInfoResponseDto';
import { UpdateUser, UpdateRiderBankInfo, UpdateGuarantorInfo } from '../../_model/profileDto';

@Component({
  selector: 'app-edit-profile-rider',
  templateUrl: './edit-profile-rider.page.html',
  styleUrls: ['./edit-profile-rider.page.scss'],
})
export class EditProfileRiderPage implements OnInit {
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  email: string;
  userinfo: UserInfoResponseDto;
  formData: FormGroup;
  passwordData: FormGroup;
  guarantorData: FormGroup;
  bankData : FormGroup;
  passwordDto: ChangePasswordDto;
  model : UpdateUser;
  bankModel : UpdateRiderBankInfo;
  guarantorModel : UpdateGuarantorInfo;
  user = JSON.parse(localStorage.getItem('userobj'));
  submitted1 = false;
  submitted2 = false;
  BankList : any;

  constructor(private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService,
    private form: FormBuilder,
    private fb: FormBuilder) { }

    ngOnInit() {
      this.userForm();
      this.getuserinfo();
      this.gurantorForm();
      this.bankForm();
      this.getBanks();
      this.passwordData = this.fb.group({
        password:[null, [Validators.maxLength(100), Validators.required]],
        confirmpassword: [null, [Validators.maxLength(100), Validators.required]]
      });
    }



    userForm(){
      this.formData = this.form.group({
        email: ['', [Validators.maxLength(100), Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        phoneNumber:['',[Validators.required]]
      },
      );

      this.formData.patchValue({
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: this.user.address,
        phoneNumber: this.user.phoneNumber
        // avatar: ['']
      })
    }

    gurantorForm() {
      this.guarantorData = this.form.group({
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        nin:['',[Validators.required]]
      },
      );
    }

    bankForm() {
      this.bankData = this.form.group({
        accountNumber : ['', Validators.required],
        bankCode : ['', Validators.required],
        bvn:['',[Validators.required]],
        validID : ['', Validators.required]
      },
      );
    }


  // get i() { return this.individualFormData.controls; }
  get g() { return this.guarantorData.controls; }
  get b() { return this.bankData.controls; }

    getuserinfo() {
      // this.loading.showLoader();
      // const token = localStorage.getItem('token');
      // if(token) {
      //   this.decordedToken = this.jwtHelper.decodeToken(token)
      //   this.email = this.decordedToken.unique_name;
      //   this.authService.getuserinfo(this.email).subscribe((res: Result) => this.edituser(res),
      //   (error: Result) => this.alertService.showErrorAlert(error.message)
      // )
      // }
    }

    edituser(res: Result): void {
      this.userinfo = res.responseData;
      this.formData.patchValue({
        email: this.userinfo.email,
        firstName: this.userinfo.firstName,
        lastName: this.userinfo.lastName,
        address: this.userinfo.address,
        phoneNumber: this.userinfo.phone
      })
      this.loading.closeLoader();
    }

  public onSubmit() : void {
      this.model = Object.assign({}, this.formData.value);
      this.loading.showLoader();
      this.authService.updateuserinfo(this.model).subscribe((res : any) => {
        this.loading.closeLoader();
        if(res.isSuccessful == true){
          this.alertService.showSuccessAlert(res.message);
        }
        else {
          this.alertService.showErrorAlert(res.message);
        }
      }, error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      })
    }

    public bvnValidation() {
      let model = {
        bvn : '',
        account_number : '',
        bank_code : '',
        first_name : '',
        last_name : '',
        middle_name : ''
      }
      this.authService.bvnlookup(model).subscribe((res : any) => {
          console.log(res);
      })
    }

    public submitBank(){
      this.submitted1 = true;
      if(this.bankData.invalid){
        return;
      }
      this.bankModel = Object.assign({}, this.bankData.value);
      this.bankModel.appUserId = this.user.id;
      this.loading.showLoader();
      let model = {
        bvn : this.bankModel.bvn,
        account_number : this.bankModel.accountNumber,
        bank_code : this.bankModel.bankCode,
        first_name : this.user.firstName,
        last_name : this.user.lastName,
        middle_name : ''
      }
      this.authService.bvnlookup(model).subscribe((res : any) => {
        this.loading.closeLoader();
          console.log(res);
          if(res.isSuccessful == true){
          this.authService.updateriderbankinfo(this.bankModel).subscribe((res : any) => {
            this.loading.closeLoader();
            this.alertService.showSuccessAlert(res.message);
          }, error => {
            this.loading.closeLoader();
            this.alertService.showErrorAlert(error.error.message);
          })
          }
          else {
            this.alertService.showErrorAlert('Account details is incorrect, Kindly confirm and try again')
          }
      })


    }

    public submitGuarantor(){
      this.submitted2 = true;
      if(this.guarantorData.invalid){
        return;
      }
      this.loading.showLoader();
      this.guarantorModel = Object.assign({}, this.guarantorData.value);
      this.guarantorModel.riderId = this.user.riderId;
      this.authService.updateriderguarantorinfo(this.guarantorModel).subscribe((res : any) => {
        this.loading.closeLoader();
        if(res.isSuccessful == true){
          this.alertService.showSuccessAlert('Profile updated successfully');
        }
        else {
          this.alertService.showErrorAlert(res.message);
        }
       
      }, error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      })
    }


    public changePassword(): void {
      this.loading.showLoader();
      const token = localStorage.getItem('token');
      if(token){
        this.decordedToken = this.jwtHelper.decodeToken(token)
        this.email = this.decordedToken.unique_name;
        console.table(this.formData.value);
        if (this.passwordData.valid) {
          this.passwordDto.email = this.email;
          this.passwordDto = Object.assign({}, this.formData.value);
          this.authService.changepassword(this.passwordDto).subscribe(next => {
            this.loading.closeLoader();
            this.alertService.showSuccessAlert('Password Changed Successfully');
          }, error => {
            this.loading.closeLoader();
            this.alertService.showErrorAlert('Error Occured!');
          });
        }
      }
    }

    getBanks() {
      this.authService.getbanks().subscribe((res : any) => {
        console.log(res);
        this.BankList = res.returnedObject.data;
      },error => {
        this.alertService.showErrorAlert(error.error.message);
      })
    }

}
