import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderPage } from 'src/app/Modals/product/type-one/order/order.page';
import { AddDropOffAddressPage } from '../add-drop-off-address/add-drop-off-address.page';
import { AddDropOffAddressesPage } from '../add-drop-off-addresses/add-drop-off-addresses.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm:any;
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };
  isscheduled = false;
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };
  single = false;
  bulkdelivery = false;
  constructor(private route: Router, private modalController : ModalController,public alertController: AlertController) {
    
   }

  ngOnInit() {
  }
  fundWallet(){
    this.route.navigate(['/dashboard/fund-wallet']);
  }
  orderdetails(){
    this.route.navigate(['/dashboard/orders-details/:id'])
  }
  focusesInput(){
    console.log(this.searchTerm)
  }
  summary(){

  }
  async orderProduct(){
    const modal = await this.modalController.create({
      component: OrderPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });

    return await modal.present();
  }
  async onChange(event){
  //alert(event);
  if(event =='single'){
    this.single = true;
    this.bulkdelivery = false;
  }
  if(event =='bulk'){
    this.bulkdelivery = true;
    this.single = false;  
  }
  if(event == 'cargo' || event =='interstate'){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'This service is not available at the moment',
      buttons: ['OK']
    });
  
    await alert.present();
  }
 
  }
  scheduled(){
    this.isscheduled = true;
  }
  rightaway(){
    this.isscheduled = false;
  }
  notavailble(){
    alert("Not available at the moment!")
  }
  async addresslist(){
    debugger;
    const modal = await this.modalController.create({
      component: AddDropOffAddressPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
}
async addAddress(){
  const modal = await this.modalController.create({
    component: AddDropOffAddressesPage,
    cssClass: 'custom_network_modal',
    backdropDismiss: true
  });
  return await modal.present();
}

}
