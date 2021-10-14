import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async showLoader(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      // duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  closeLoader(){
    this.loadingController.dismiss();
  }

}
