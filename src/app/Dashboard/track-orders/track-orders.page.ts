import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingService } from '../../Services/loading/loading.service';

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.page.html',
  styleUrls: ['./track-orders.page.scss'],
})
export class TrackOrdersPage implements OnInit {

  deliveryObj = JSON.parse(localStorage.getItem('trackdeliverydetails'));

  constructor(
    private route: Router,
    private modalController: ModalController,
    private loading : LoadingService

    ) { }

  ngOnInit() {
    this.modalController.dismiss();
    this.loading.closeLoader();
  }

  gotoTrackDetails(id){
    this.route.navigate(['dashboard/track-orders-details', id]);
  }

  gotoTrackDetails2(id){
    this.route.navigate(['dashboard/order-fullfillment', id]);
  }

}
