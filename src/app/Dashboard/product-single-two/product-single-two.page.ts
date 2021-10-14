import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddToCartPage } from '../../Modals/product/type-one/add-to-cart/add-to-cart.page'

@Component({
  selector: 'app-product-single-two',
  templateUrl: './product-single-two.page.html',
  styleUrls: ['./product-single-two.page.scss'],
})
export class ProductSingleTwoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async addToCart(){
    const modal = await this.modalController.create({
      component: AddToCartPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });

    return await modal.present();
  }

}
