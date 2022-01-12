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

  constructor(private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService,
    private form: FormBuilder,
    private fb: FormBuilder) { }

    ngOnInit() {
      this.userForm();
      this.getuserinfo();

      this.passwordData = this.fb.group({
        password:[null, [Validators.maxLength(100), Validators.required]],
        confirmpassword: [null, [Validators.maxLength(100), Validators.required]]
      });
    }

    showSuccess(){
      debugger;
      this.alertService.showSuccessAlert('Profile updated succesful !');
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
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        nin:['',[Validators.required]]
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
      this.authService.updateuserinfo(this.model).subscribe((res) => {
        this.loading.closeLoader();
        this.alertService.showSuccessAlert('Profile updated successfully');
      })
    }

    public submitBank(){
      this.submitted1 = true;
      if(this.bankData.invalid){
        return;
      }
      this.bankModel = Object.assign({}, this.bankData.value);
      this.loading.showLoader();
      this.authService.updateriderbankinfo(this.bankModel).subscribe((res) => {
        this.loading.closeLoader();
        this.alertService.showSuccessAlert('Profile updated successfully');
      })

    }

    public submitGuarantor(){
      this.submitted2 = true;
      if(this.guarantorData.invalid){
        return;
      }
      this.guarantorModel = Object.assign({}, this.guarantorData.value);
      this.authService.updateriderguarantorinfo(this.guarantorModel).subscribe((res) => {
        this.loading.closeLoader();
        this.alertService.showSuccessAlert('Profile updated successfully');
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

}
