import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { NoNetworkPage } from 'src/app/Modals/no-network/no-network.page';
import { Result } from 'src/app/_model/result';
import { AlertService } from 'src/app/Services/alert/alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  formdata: FormGroup;
  model: any = {};
  ress: Result;
  constructor(private router: Router,
    public modalController: ModalController,
    private loading: LoadingService,
    private form: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createform();
  }
createform() {
  this.formdata = this.form.group({
    email: [null, [Validators.maxLength(100), Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]]
  });
}

gotoPasswordReset(){
  this.router.navigate(['/reset-password']);
}

gotoSignup(){
  this.router.navigate(['/sign-up']);
}

async showNetworkModal() {
  const modal = await this.modalController.create({
    component: NoNetworkPage,
    cssClass: 'custom_network_modal',
    backdropDismiss: true
  });
  return await modal.present();
}
showloader(){}
public submitForm(): void {
  this.loading.showLoader();
  console.table(this.formdata.value);
  if (this.formdata.valid) {
    this.model = Object.assign({}, this.formdata.value);
    this.model.deviceType = 1
    this.authService.verifyemail(this.model).subscribe((res: Result)=> {
      debugger;
      this.ress = res;
      if(res.isSuccessful) {
        this.loading.closeLoader();
        this.router.navigate(['/login']);
      }
      else {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(res.message);
      }
    });
  }
}
}