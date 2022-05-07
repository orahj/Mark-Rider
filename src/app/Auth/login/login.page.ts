import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NoNetworkPage } from '../../Modals/no-network/no-network.page';
import { LoadingService } from '../../Services/loading/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { AuthStorageService } from 'src/app/Services/authStorage.service';
import { Login } from 'src/app/_model/authDto';
// import { Events } from 'ionic-angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData: FormGroup;
  model: Login;
  submitted = false;
  constructor(
    private router: Router,
    public modalController: ModalController,
    private loading: LoadingService,
    private form: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private auth: AuthStorageService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formData = this.form.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      password: [null, [Validators.required]],
    },
    );
  }

  gotoPasswordReset(){
    this.router.navigate(['/reset-password']);
  }

  gotoSignup(){
    this.router.navigate(['/sign-up-option']);
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


  get f() { return this.formData.controls; }

  public onSubmit() : void {
    this.submitted = true;
    if(this.formData.invalid){
      return;
    }
    //this.loading.showLoader();
    this.model = Object.assign({}, this.formData.value);
    this.authService.login(this.model).subscribe((res) => {
      //this.loading.closeLoader();
    },error => {
      //this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })

  }
  public submitForm(): void {
    //this.loading.showLoader();
    console.table(this.formData.value);
    if (this.formData.valid) {
      this.model = Object.assign({}, this.formData.value);
      this.router.navigate(['/dashboard']);
      this.loading.closeLoader();
      //this.authService.login(this.model).subscribe();
    }
  }
}
