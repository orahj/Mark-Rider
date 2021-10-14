import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentSuccessPage } from '../../Modals/payment-success/payment-success.page'

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async payWithCard(){
    const modal = await this.modalController.create({
      component: PaymentSuccessPage,
      cssClass: 'custom_network_modal_2',
      backdropDismiss: true
    });

    return await modal.present();
  }

  cardChanged($data){
    alert($data);
  }

}
