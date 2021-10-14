import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  gotoDelivery(){
    this.route.navigate(['/delivery-details']);
  }
}
