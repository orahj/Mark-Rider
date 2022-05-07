import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit {

  details = JSON.parse(localStorage.getItem('notificationdetails'));
  user = JSON.parse(localStorage.getItem('userobj'));
  constructor(
    private route: Router,
    private loading : LoadingService,
    private alert : AlertService,
    private authService : AuthService,
    private modal : ModalController,
    private alertController : AlertController
  ) { }

  ngOnInit() {
  }

  patchNotification() {
    debugger;
    this.loading.showLoader();
    this.authService.readnotificationbyid(this.details.id).subscribe((res : any) => {
        this.loading.closeLoader();
        this.alert.showSuccessAlert(res.message);
        this.route.navigate(['/dashboard/notification'])
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }

  deleteNotification() {
    this.loading.showLoader();
    this.authService.deletenotificationbyid(this.details.id).subscribe((res : any) => {
        this.loading.closeLoader();
        this.alert.showSuccessAlert(res.message);
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }

  getDelivery(){
    this.loading.showLoader();
    console.log(this.details.data.DeliveryId);
    this.authService.getdeliveryitem(this.details.data.DeliveryId).subscribe((res: any) => {
      this.loading.closeLoader;
      localStorage.setItem('trackorderdetails', JSON.stringify(res));
       this.route.navigate(['dashboard/track-orders-details']).then(()=>{});
       this.modal.dismiss();
    },error => {
      if(error){
        this.loading.closeLoader;
        this.alert.showErrorAlert(error.error.message);
      }
    })
  }

}
