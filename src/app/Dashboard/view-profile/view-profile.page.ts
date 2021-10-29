import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { UserInfoResponseDto } from 'src/app/_model/userInfoResponseDto';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  email: string;
  userinfo: UserInfoResponseDto;
  constructor( private router: Router,
      private loading: LoadingService,
      private authService: AuthService,
      private alertService: AlertService) { }

  ngOnInit() {
    this.getuserinfo();
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

  changePassword() {
    this.router.navigate(['/dashboard/edit-profile']);
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
   }
}
