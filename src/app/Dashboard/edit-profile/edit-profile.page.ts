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
  user = JSON.parse(localStorage.getItem('userobj'));
  resetUrl = JSON.parse(localStorage.getItem('reseturl'));
  tokeurl : string;
  upadtedUrl : string;
  newPassword : string;
  constructor(private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    private alertService: AlertService,
    private form: FormBuilder,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getuserinfo();
    this.sendResetLink();


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
        this.authService.changepassword(this.passwordDto).subscribe(res => {
          this.loading.closeLoader();
          this.alertService.showSuccessAlert(res.message);
        }, error => {
          this.loading.closeLoader();
          this.alertService.showErrorAlert(error.error.message);
        });
      }
    }
  }



  sendResetLink() {
    let mail =  {
       email: this.user.email
     } 
     if(this.user.email !== undefined) {
       this.loading.showLoader();
       this.authService.resetlink(mail).subscribe((res : any) => {
         if(res.isSuccessful === true){
           localStorage.setItem('reseturl', JSON.stringify(res.returnedObject.url));
           this.loading.closeLoader();
           this.formatUrl();
         }
       },
       error => {
         this.loading.closeLoader();
         this.alertService.showErrorAlert(error.error.message);
       })
     }
   }

   formatUrl(){
    let fommatedStr = this.resetUrl.split('=');
    let newFormat = fommatedStr[1].split('&');
    this.tokeurl = newFormat[0];
}


resetPassword() {
 let resetObj =  {
      email: this.user.email,
      newPassword : this.newPassword,
      token : this.tokeurl
    } 
    if(this.newPassword !== undefined) {
      this.loading.showLoader();
      this.authService.resetpassword(resetObj).subscribe((res : any) => {
        if(res.isSuccessful === true){
          this.loading.closeLoader();
          this.alertService.showSuccessAlert(res.message);
        }
      },
      error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      })
    }

}
}
