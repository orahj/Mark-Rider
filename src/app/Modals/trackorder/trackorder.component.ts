import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.scss'],
})
export class TrackorderComponent implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {}

  trackOrders(){
    this.router.navigate(['/dashboard/track-orders']);
    this.modalController.dismiss();
  }

}
