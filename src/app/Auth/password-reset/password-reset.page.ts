import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { LoadingService } from '../../Services/loading/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  public newPassword: string;
  user = JSON.parse(localStorage.getItem('userobj'));
  email : string;
  tokeurl : string;
  resetUrl = JSON.parse(localStorage.getItem('reseturl'));

  constructor(
    private authService : AuthService,
    private loading : LoadingService,
    private alertService : AlertService,
    private router : Router
  ) { }

  ngOnInit() {
    this.formatUrl();
  }

  formatUrl(){
      let fommatedStr = this.resetUrl.split('=');
      console.log('Fommated String',fommatedStr);
      this.email = fommatedStr[2];
      console.log('New url',fommatedStr[1]);
      let newFormat = fommatedStr[1].split('&');
      console.log('New New', newFormat );
      this.tokeurl = newFormat[0];
}


resetPassword() {
   let resetObj =  {
        email: this.email,
        newPassword : this.newPassword,
        token : this.tokeurl
      } 
      if(this.newPassword !== undefined) {
        this.loading.showLoader();
        this.authService.resetpassword(resetObj).subscribe((res : any) => {
          if(res.isSuccessful === true){
            this.loading.closeLoader();
            this.alertService.showSuccessAlert(res.message);
            this.router.navigate(['/login']);
          }
        },
        error => {
          this.loading.closeLoader();
          this.alertService.showErrorAlert(error.error.message);
        })
      }

}
}
