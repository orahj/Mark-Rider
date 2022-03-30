import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  
  trackingdetails = JSON.parse(localStorage.getItem('trackorderdetails'));
  constructor(private route: Router) { }

  ngOnInit() {
  }

  gotoOrderDetails(id){
    this.route.navigate(['/dashboard/orders-details', id]);
  }

  trackShipment() {
    this.route.navigate(['/dashboard/track-orders']);
  }
}

