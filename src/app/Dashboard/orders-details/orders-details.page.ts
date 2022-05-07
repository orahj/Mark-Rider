import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { LoadingService } from '../../Services/loading/loading.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

  deliveryObj = JSON.parse(localStorage.getItem('deliverydetails'));
  user = JSON.parse(localStorage.getItem('userobj'));
  rating : number;
  comment : string;
  disputereason : string;

  constructor(
    private alertService : AlertService,
    private authService : AuthService,
    private loading : LoadingService
  ) { }

  ngOnInit() {
    console.log(this.deliveryObj);
  }

  submitReview(){
    alert('clicked');
  }
  gotoOrderDetails(){}

  completeDelivery(){
    if(this.rating !== undefined){
      let model = {
        appUserId : this.user.id,
        deliveriesId : this.deliveryObj[0].deliveryId,
        rating : this.rating,
        ratingcomment : this.comment 
      }
      this.loading.showLoader();
      this.authService.completedelivery(model).subscribe((res : any) => {
        this.loading.closeLoader();
        this.alertService.showSuccessAlert(res.message);
      }, error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      })
    }
  }

  disputeDelivery() {
    if(this.disputereason !== undefined || this.rating !== undefined){
      let model = {
        appUserId : this.user.id,
        deliveriesId : this.deliveryObj[0].deliveryId,
        rating : this.rating,
        ratingcomment : this.comment,
        disputdeReason : this.disputereason
      }
  
      this.loading.showLoader();
      this.authService.disputedelivery(model).subscribe((res : any) => {
        this.loading.closeLoader();
        this.alertService.showSuccessAlert(res.message);
      }, error => {
        this.loading.closeLoader();
        this.alertService.showErrorAlert(error.error.message);
      })
    }
  }
}
