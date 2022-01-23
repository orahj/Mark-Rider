import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  returnedObj = JSON.parse(localStorage.getItem('deliveryReturnedObj'));
  constructor(private modalController: ModalController, private route: Router) { }

  ngOnInit() {
  }

  goHome(){
    this.route.navigate(['/dashboard/wallet']);
    this.modalController.dismiss();
  }
}
