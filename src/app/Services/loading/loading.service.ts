import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  constructor(private loadingController: LoadingController) { }

  // async showLoader(){
  //   this.isLoading = true;
  //   return await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     // duration: 2000
  //   }).then(a => {
  //     if(!this.isLoading){
  //       a.dismiss().then(() =>{})
  //     }
  //   })
  // }

  async showLoader(){
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'circles',
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async closeLoader(){
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

//   async closeLoader(){
//     this.isLoading = false
//     return await this.loadingController.dismiss().then(()=> {});
//  }

}
