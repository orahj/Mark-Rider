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
  itemTime : string;


  constructor(
    private modalController: ModalController,
    private router: Router
    ) { }

  ngOnInit() {
    if(this.itemList.deliveryTime == 1){
        this.itemTime = 'Right Away'
    }
    else if(this.itemList.deliveryTime == 2) {
      this.itemTime = 'Schedule for later';
    }
    console.log('Item Time',this.itemTime);
  }

  async addToCart(){
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddToCartPage,
      cssClass: 'custom_network_modal_2',
      backdropDismiss: true
    });

    return await modal.present();
  }
Proceedayment(){
  this.modalController.dismiss();
  this.router.navigate(['/dashboard/checkout']);
}
}
