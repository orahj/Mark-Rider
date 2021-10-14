import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(private modalController: ModalController,private router: Router) { }

  ngOnInit() {
  }

  async addToCart(){
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddToCartPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });

    return await modal.present();
  }
Proceedayment(){
  this.modalController.dismiss();
  this.router.navigate(['/dashboard/checkout']);
}
}
