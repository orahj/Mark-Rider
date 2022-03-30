import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentSuccessPage } from '../payment-success/payment-success.page';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';


@Component({
  selector: 'app-transfer-payment',
  templateUrl: './transfer-payment.page.html',
  styleUrls: ['./transfer-payment.page.scss'],
})
export class TransferPaymentPage implements OnInit {

  returnedObj = JSON.parse(localStorage.getItem('deliveryReturnedObj'));
  public refCode : string = "TR-" + Math.floor((Math.random() * 1000000000) + 1);
  user = JSON.parse(localStorage.getItem('userobj'));
  public Image : any;
  imageUrl : any;

  constructor(
    private modalController: ModalController,
    private loading : LoadingService,
    private authService : AuthService,
    private alert : AlertService,
    private alertService : AlertService
    ) { }

  ngOnInit() {
  }
  async paySuccess(){
    const modal = await this.modalController.create({
      component: PaymentSuccessPage,
      cssClass: 'custom_network_modal_2',
      backdropDismiss: true
    });

    return await modal.present();
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
    
    document.getElementById("TheImageContents").innerHTML = '<img width="50" height="50"  src="'+TheFileContents+'" />';
    // document.getElementById("TheImageContents").innerHTML = '<img width="100" height="100" src="'+TheFileContents+'" />';
    this.uploadImage();
    }
  }

  uploadImage(){
    this.loading.showLoader();
    this.authService.fileupload(this.Image).subscribe((res : any) => {
      this.loading.closeLoader();
      let uploadedimg = res.returnedObject.url;
      this.imageUrl = res.returnedObject.url;
      document.getElementById("TheImageContents").innerHTML = '<img width="50" height="50"  src="'+uploadedimg+'" />';
      this.alertService.showSuccessAlert(res.message)
    }, error => {
      this.loading.closeLoader();
      this.alertService.showErrorAlert(error.error.message);
    })
  }

  payForDelivery(){
    let transferObj = {
      transactionRef: this.refCode,
      transactionId: this.returnedObj.transactionId,
      amount: this.returnedObj.totalAmount,
      email: this.user.email,
      userId: this.user.id,
      deliveryId : this.returnedObj.id
    }

    this.loading.showLoader();
    this.authService.paywithtransfer(transferObj).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alert.showSuccessAlert(res.message);
      localStorage.removeItem('deliveryObj');
      this.paySuccess();
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }
}
