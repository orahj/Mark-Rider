import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pick-up-location',
  templateUrl: './pick-up-location.page.html',
  styleUrls: ['./pick-up-location.page.scss'],
})
export class PickUpLocationPage implements OnInit {

  constructor(private modalController : ModalController,public alertController: AlertController) { }

  ngOnInit() {
  }
 async orderProduct(){
    this.modalController.dismiss();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Going to Pick up',
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
