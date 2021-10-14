import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitReview(){
    alert('clicked');
  }
  gotoOrderDetails(){}
}
