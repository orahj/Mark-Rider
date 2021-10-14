import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController) { }

  async showSuccessAlert(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      color: 'dark',
      cssClass: 'toast_ctr',
    });
    toast.present();
  }

  async showErrorAlert(message) {
    const toast = await this.toastController.create({
      message: message,
      color: 'danger',
      position: 'bottom',
      cssClass: 'toast_ctr'
    });
    toast.present();
  }

}
