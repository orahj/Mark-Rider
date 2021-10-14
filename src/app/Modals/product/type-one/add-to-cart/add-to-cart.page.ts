import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  goToHome(){
    this.modalController.dismiss();
    this.router.navigate(['/dashboard']);
  }

  proceedToCheckout(){
    this.modalController.dismiss();
    this.router.navigate(['/dashboard/checkout']);
  }

}
