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
  public deliveryObj = JSON.parse(localStorage.getItem('deliveryObj'));
  public returnedObj = JSON.parse(localStorage.getItem('deliveryReturnedObj'));
  itemList = this.deliveryObj[0];
  user = JSON.parse(localStorage.getItem('userobj'));

  constructor(
    private modalController: ModalController,
    private router: Router
    ) { }

  ngOnInit() {
    console.log('Returned Object', this.returnedObj);
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
