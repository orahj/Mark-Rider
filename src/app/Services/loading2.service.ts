import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Loading2Service {

  constructor(private loadingCtr: LoadingController) { }
  async presentLoading(){
    const loading = await this.loadingCtr.create({
      cssClass:'my-custom-class',
      message:'please wait...',
      duration: 2000
    });
    await loading.present();
  }
  dismiss(){
    this.loadingCtr.dismiss();
    console.log('loading dismissed');
  }
}
