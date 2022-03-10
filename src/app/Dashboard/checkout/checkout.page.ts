import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TransferPaymentPage } from 'src/app/Modals/transfer-payment/transfer-payment.page';
import { WalletPaymentPage } from 'src/app/Modals/wallet-payment/wallet-payment.page';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { PayWithWallet, VerifyPayment } from '../../_model/walletDto';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PaymentSuccessPage } from '../../Modals/payment-success/payment-success.page';
import { FundwalletComponent } from 'src/app/Modals/fundwallet/fundwallet.component';
declare var PaystackPop: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public qty : number = 20;
  private max_order_limit: number = 35;
  private min_order_limit: number = 2;
  public walletRef : string = "WAL-" + Math.floor((Math.random() * 1000000000) + 1);
  public paystackReCode : string = "DP-" + Math.floor((Math.random() * 1000000000) + 1);
  deliveryObj = JSON.parse(localStorage.getItem('deliveryObj'));
  firstItemList = this.deliveryObj[0];
  returnedObj;
  user = JSON.parse(localStorage.getItem('userobj'));
  public walletBalance : number;
  public Total;
  theSate: boolean;
  walletModel : PayWithWallet;
  verifyModel : VerifyPayment;
  public paystackStatus : boolean = false;
  verifyObj : any;
  _bState = false;
  payRef : any;
  createshipmentstatus = false;
  public EditItem : any;

  constructor(
    private route: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private authService : AuthService,
    private loading : LoadingService,
    private alert : AlertService) { }
 
  ngOnInit() {
    this.getWalletBalance();
  }

  increaseOrder(){
    if(this.qty && this.qty != this.max_order_limit){
       this.qty++;
    } else {
      // Show dialog for max order limit.
    }
  }

  decreaseOrder(){
    if(this.qty && this.qty > this.min_order_limit){
       this.qty--;
    } else {
    }
  }

  payWithCard(){
    this.route.navigate(['dashboard/pay']);
  }
  payWithWallet(){
    this.route.navigate(['dashboard/pay-wallet']);
  }
  payWithTransfer(){
    this.route.navigate(['dashboard/pay-transfer']);
  }

  editItem(selected){
    localStorage.setItem('edititem', JSON.stringify(selected));
    let findResult = this.deliveryObj.findIndex(x => x.pickUpItems === selected.pickUpItems);   
    if (findResult >= 0) {
      this.deliveryObj.splice(findResult, 1 );
    }
    localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
    this.route.navigate(['dashboard/edit-item']);
  }


  async showFundModal() {
    const modal = await this.modalController.create({
      component: FundwalletComponent,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
  }


async disclaimerAlert(){
      const alert = await this.alertController.create({
        header: 'Disclaimer',
        cssClass: 'my-custom-class',
        message: 
        'Ensure that the picture uploaded is the same as the item/s to be picked and it’s a shipment a bike can carry. Any fraudulent act won’t be tolerated',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Create Delivery',
            handler: (value) => {
              this.createDelivery();
            }
          }
        ]
      });
      await alert.present();
}

async paySuccess(){
  const modal = await this.modalController.create({
    component: PaymentSuccessPage,
    cssClass: 'custom_network_modal_2',
    backdropDismiss: true
  });

  return await modal.present();
}

async deleteItem(selected){
    const alert = await this.alertController.create({
      header: 'Delete Details',
      cssClass: 'my-custom-class',
      message: 
      'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Delete',
          handler: (value) => {
            this.deliveryObj.splice(selected, 1);
            localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
          }
        }
      ]
    });
    await alert.present();
}

public  payWithPaystack(){
 this.Total = this.returnedObj.totalAmount 
 console.log('Amount',this.Total);
  var handler = PaystackPop.setup({
    key: 'pk_test_2ae6eeddbe5dded1d9ae213cd0a217686aa7286d',
    email: this.user.email,
    ref : this.paystackReCode,
    amount: this.Total + "00", 
    metadata: {
      custom_fields: [
        {
          display_name: "Paid via",
          variable_name: "paid_via",
          value: 'Mark Riders'
        },
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: this.user.phone
        }
      ]
    },
    callback: (response) => {
      this.payRef = response.reference;
      this.verifyPayment();
  },
  onClose: function(){
    this.route.navigate(['/dashboard']).then(()=>{});
  }
});
handler.openIframe();
}

getWalletBalance(){
  this.authService.getwalletbalance(this.user.email).subscribe((res : any) => {
    this.walletBalance = res.returnedObject.balance;
  })
}

paymentSuccess(){
  this.modalController.dismiss();
  this.route.navigate(['/dashboard']);
}

paywithWallet() {
  let walletObj = {
    transactionRef: this.payRef,
    transactionId: this.returnedObj.transactionId,
    amount: this.Total,
    email: this.user.email,
    userId: this.user.id
  }
  // this.walletModel.amount = this.Total;
  // this.walletModel.email = this.user.email;
  // this.walletModel.transactionId = this.returnedObj.transactionId;
  // this.walletModel.userId = this.user.id;
  this.loading.showLoader();
  this.authService.walletpayment(walletObj).subscribe((res : any) => {
    this.loading.closeLoader();
    this.alert.showSuccessAlert(res.message);
    this.paySuccess();
  }, error => {
    this.alert.showErrorAlert(error.error.message);
  })
}

public verifyPayment() {
    let verifyObj = {
      transactionRef: this.paystackReCode,
      transactionId: this.returnedObj.transactionId,
      amount: this.Total + '00',
      email: this.user.email,
      userId: this.user.id
    }
    this.loading.showLoader();
    this.authService.verifytransaction(verifyObj).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alert.showSuccessAlert(res.message)
      this.paySuccess();
    },error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }
  

  public addAddress(){
    this.route.navigateByUrl('/dashboard/add-address');
  }

  public addItem(){
    this.route.navigateByUrl('/dashboard/add-item');
  }

  public Edit(data) {
    this.EditItem = data;
  }

  public UpdateItem(){
    this.deliveryObj[this.EditItem]
    localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
  }

  public DeleteItem(selected) {
    this.deliveryObj.splice(selected, 1);
    localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
  }

  public createDelivery(){
    let data = {
      email: this.user.email,
      deliveryItems :  this.deliveryObj
    }
   
    this.loading.showLoader();
    this.authService.createdelivery(data).subscribe((res : any) => {
      if(res.isSuccessful === true ){
        let returnObj = {
          deliveryNo: res.returnedObject.deliveryNo,
          totalAmount : res.returnedObject.totalAmount,
          transactionId : res.returnedObject.transactionId,
          id : res.returnedObject.id
        }
        localStorage.setItem('deliveryReturnedObj', JSON.stringify(returnObj));
        this.loading.closeLoader();
        this.createshipmentstatus = true;
        this.Total = res.returnedObject.totalAmount;
        this.returnedObj = JSON.parse(localStorage.getItem('deliveryReturnedObj'))
      }
     
    })
  }

}
