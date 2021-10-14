import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-dispute',
  templateUrl: './order-dispute.page.html',
  styleUrls: ['./order-dispute.page.scss'],
})
export class OrderDisputePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  orderDisputeReport(id, complain_type){
    this.route.navigate(['dashboard/order-dispute-successpage', id, complain_type]);
  }

}
