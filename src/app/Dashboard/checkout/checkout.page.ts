import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TransferPaymentPage } from 'src/app/Modals/transfer-payment/transfer-payment.page';
import { WalletPaymentPage } from 'src/app/Modals/wallet-payment/wallet-payment.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public qty : number = 20;
  private max_order_limit: number = 35;
  private min_order_limit: number = 2;
  theSate: boolean;
_bState = false;
  constructor(private route: Router, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
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

}
