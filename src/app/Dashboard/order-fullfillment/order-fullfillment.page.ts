import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-fullfillment',
  templateUrl: './order-fullfillment.page.html',
  styleUrls: ['./order-fullfillment.page.scss'],
})
export class OrderFullfillmentPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  acceptOrder(){
    this.route.navigate(['/dashboard/order-fullfillment-thankyou']);
  }

  disputeOrder(id){
    this.route.navigate(['/dashboard/order-dispute', id]);
  }
  
}
