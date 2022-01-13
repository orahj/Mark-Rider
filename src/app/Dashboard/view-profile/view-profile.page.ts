import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { UserInfoResponseDto } from 'src/app/_model/userInfoResponseDto';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { Result } from 'src/app/_model/result';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateUser } from 'src/app/_model/profileDto';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  email: string;
  formData: FormGroup;
  userinfo: UserInfoResponseDto;
  model : UpdateUser;
  user = JSON.parse(localStorage.getItem('userobj'));
  public Image : any;
  constructor( private router: Router,
      private loading: LoadingService,
      private authService: AuthService,
      private alertService: AlertService,
      private form: FormBuilder,) { }

  ngOnInit() {
    this.getuserinfo();
    this.userForm();
  }
  getuserinfo() {
    // this.loading.showLoader();
    // const token = localStorage.getItem('token');
    // if(token) {
    //   this.decordedToken = this.jwtHelper.decodeToken(token)
    //   this.email = this.decordedToken.unique_name;
    //   this.authService.getuserinfo(this.email).subscribe((res: Result) =>{
    //     this.userinfo = res.responseData;
    //     if(this.userinfo != null) {
    //       this.loading.closeLoader();
    //     }
    //     else{
    //       this.loading.closeLoader();
    //       this.alertService.showErrorAlert(res.message);
    //     }
    //   });
    // }
  }

  onFileChanged(fileInput: any) {
    var reader = new FileReader();  
    this.Image = <File>fileInput.target.files[0];
    var mimeType =  this.Image.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    reader.readAsDataURL(this.Image); 
    reader.onload = (_event) => { 
    let TheFileContents = reader.result;
    document.getElementById("TheImageContents").innerHTML = '<img width="50" height="50" style="border-radius: 50px" src="'+TheFileContents+'" />';
    //this.uploadImage();
    }
  }

  changePassword() {
    this.router.navigate(['/dashboard/edit-profile']);
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
   }

   userForm () {
    this.formData = this.form.group({
      email: ['', Validators.required],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      // avatar: ['']
    },
    );
      this.formData.patchValue({
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: this.user.address,
        phoneNumber: this.user.phoneNumber,
        // avatar: ['']
      })
      
   }

   public onSubmit () : void {
    this.model = Object.assign({}, this.formData.value);
    this.loading.showLoader();
    this.authService.updateuserinfo(this.model).subscribe((res) => {
      this.loading.closeLoader();
      this.alertService.showSuccessAlert('Profile updated successfully');
    })
   }

}
