import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AddDropOffAddressPage } from '../add-drop-off-address/add-drop-off-address.page';
import { PickUpLocationPage } from '../pick-up-location/pick-up-location.page';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {
  single = false;
  bulkdelivery = false;
  constructor(private route: Router, private modalController : ModalController,public alertController: AlertController) { }

  ngOnInit() {
  }
  orderdetails(){

  }
  async pickUpLocation(){
    const modal = await this.modalController.create({
      component: PickUpLocationPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
  }
  async DeliveryAddress(){
    const modal = await this.modalController.create({
      component: AddDropOffAddressPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
  }
  async startDelivery(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Delivery started',
      buttons: ['OK']
    });
  
    await alert.present();
  }
}

