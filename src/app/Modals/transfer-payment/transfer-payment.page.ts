import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentSuccessPage } from '../payment-success/payment-success.page';

@Component({
  selector: 'app-transfer-payment',
  templateUrl: './transfer-payment.page.html',
  styleUrls: ['./transfer-payment.page.scss'],
})
export class TransferPaymentPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async payWithTransfer(){
    const modal = await this.modalController.create({
      component: PaymentSuccessPage,
      cssClass: 'custom_network_modal_2',
      backdropDismiss: true
    });

    return await modal.present();
  }
}
