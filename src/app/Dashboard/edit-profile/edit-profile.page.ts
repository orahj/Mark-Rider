import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../Services/alert/alert.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfoResponseDto } from 'src/app/_model/userInfoResponseDto';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Result } from 'src/app/_model/result';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ChangePasswordDto } from 'src/app/_model/changePasswordDto';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  email: string;
  userinfo: UserInfoResponseDto;
  formData: FormGroup;
  passwordData: FormGroup;
  passwordDto: ChangePasswordDto;
  constructor(private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService,
    private form: FormBuilder,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getuserinfo();
    this.formData = this.form.group({
      email: ['', [Validators.maxLength(100), Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      address:['',[Validators.required]],
      phone:['',[Validators.required]],
      nimc:['',[Validators.required]]
    },
    );
    this.passwordData = this.fb.group({
      password:[null, [Validators.maxLength(100), Validators.required]],
      confirmpassword: [null, [Validators.maxLength(100), Validators.required]]
    });
  }

  showSuccess(){
    this.alertService.showSuccessAlert('Profile updated succesful !');
    // this.alertService.showErrorAlert('Profile updated succesful !');
  }
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
      phone: this.userinfo.phone
    })
    this.loading.closeLoader();
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
