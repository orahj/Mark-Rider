import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { LoadingService } from '../../Services/loading/loading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user = JSON.parse(localStorage.getItem('userobj'));
  email : string;
  constructor(
    private authService : AuthService,
    private loading : LoadingService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
  }

  sendResetLink() {
   let mail =  {
      email: this.email
    }

    this.loading.showLoader();
    this.authService.resetlink(mail).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message);
      console.log(res);
    })
  }

}
