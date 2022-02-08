import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { LoadingService } from '../../Services/loading/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user = JSON.parse(localStorage.getItem('userobj'));
  email : string;
  resetUrl = JSON.parse(localStorage.getItem('reseturl'));
  upadtedUrl : string;
  constructor(
    private authService : AuthService,
    private loading : LoadingService,
    private alertService : AlertService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  sendResetLink() {
   let mail =  {
      email: this.email
    } 
    if(this.email !== undefined) {
      this.loading.showLoader();
      this.authService.resetlink(mail).subscribe((res : any) => {
        if(res.isSuccessful === true){
          localStorage.setItem('reseturl', JSON.stringify(res.returnedObject.url));
          this.loading.closeLoader();
          this.router.navigate(['/password-reset']);
        }
      },
      error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      })
    }
  }
}
