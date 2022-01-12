import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TransferPaymentPage } from 'src/app/Modals/transfer-payment/transfer-payment.page';
import { WalletPaymentPage } from 'src/app/Modals/wallet-payment/wallet-payment.page';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { PayWithWallet } from '../../_model/walletDto';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PaymentSuccessPage } from '../../Modals/payment-success/payment-success.page';
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
  // public reCode : string = "DP-" + Math.floor((Math.random() * 1000000000) + 1);
  deliveryObj = JSON.parse(localStorage.getItem('deliveryObj'));
  itemList = this.deliveryObj[0];
  returnedObj = JSON.parse(localStorage.getItem('deliveryReturnedObj'));
  user = JSON.parse(localStorage.getItem('userobj'));
  public walletBalance : number;
  public Total : number;
  theSate: boolean;
  walletModel : PayWithWallet;
_bState = false;
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
      // Show dialog for max order limit.
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

  async stateChange(event){
    if(event){
      const alert = await this.alertController.create({
        header: 'Disclamier',
        cssClass: 'my-custom-class',
        message: 
        'Ensure that the picture uploaded is the same as the item/s to be picked and it’s a shipment a bike can carry. Any fraudulent act won’t be tolerated',
        buttons: ['Cancel', 'Proceed']
      });
      await alert.present();
    }
    else{
        const alert = await this.alertController.create({
          header: 'Alert',
          cssClass: 'my-custom-class',
          message: 'Are you sure you want go offline',
          buttons: ['Disagree', 'Agree']
        });
        await alert.present();
    console.log(event);
  }
}

async paySuccess(){
  const modal = await this.modalController.create({
    component: PaymentSuccessPage,
    cssClass: 'custom_network_modal_2',
    backdropDismiss: true
  });

  return await modal.present();
}

public  payWithPaystack(){
 this.Total = this.returnedObj.totalAmount 
  console.log('Amount2',this.Total);
  var handler = PaystackPop.setup({
    key: 'pk_test_2ae6eeddbe5dded1d9ae213cd0a217686aa7286d',
    email: this.user.email,
    ref : this.walletRef,
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
    callback: function(response){
  },
  onClose: function(){
    this.router.navigate(['dashboard/wallet']).then(()=>{});
  }
});
handler.openIframe();
}

getWalletBalance(){
  this.authService.getwalletbalance(this.user.email).subscribe((res : any) => {
    console.log(res)
    this.walletBalance = res.returnedObject.balance;
  })
}

paywithWallet() {
  let walletObj = {
    transactionRef: '',
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
  this.authService.walletpayment(walletObj).subscribe((res) => {
    this.loading.closeLoader();
    this.paySuccess();
    console.log(res);
  })
}

}
