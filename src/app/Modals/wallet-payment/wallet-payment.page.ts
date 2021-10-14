import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentSuccessPage } from '../payment-success/payment-success.page';

@Component({
  selector: 'app-wallet-payment',
  templateUrl: './wallet-payment.page.html',
  styleUrls: ['./wallet-payment.page.scss'],
})
export class WalletPaymentPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async payWithWallet(){
    const modal = await this.modalController.create({
      component: PaymentSuccessPage,
      cssClass: 'custom_network_modal_2',
      backdropDismiss: true
    });

    return await modal.present();
  }
}
