import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TransferPaymentPage } from 'src/app/Modals/transfer-payment/transfer-payment.page';
import { WalletPaymentPage } from 'src/app/Modals/wallet-payment/wallet-payment.page';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public qty : number = 20;
  private max_order_limit: number = 35;
  private min_order_limit: number = 2;
  constructor(private route: Router, private modalController: ModalController) { }

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
}
