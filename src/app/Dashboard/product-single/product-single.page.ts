import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderPage } from '../../Modals/product/type-one/order/order.page'

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.page.html',
  styleUrls: ['./product-single.page.scss'],
})
export class ProductSinglePage implements OnInit {
  private qty: number = 30;
  private max_order_limit: number = 35;
  private min_order_limit: number = 2;

  constructor( private modalController : ModalController) { }

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

  async orderProduct(){
    const modal = await this.modalController.create({
      component: OrderPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });

    return await modal.present();
  }

}
