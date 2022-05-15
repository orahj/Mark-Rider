import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  user = JSON.parse(localStorage.getItem('userobj'));
  NotificationList : any | [];
  ItemSelected : any;

  constructor(
    private route: Router,
    private loading : LoadingService,
    private alert : AlertService,
    private authService : AuthService,
    private modal : ModalController,
    private alertController : AlertController
    ) { }

  ngOnInit() {
    this.getNotification();
  }
  gotoDelivery(){
    this.route.navigate(['/delivery-details']);
  }

  ionViewDidEnter() {
    this.modal.dismiss();
  }

  ionViewWillEnter(){
    this.modal.dismiss();
  }

  getNotification(){
    this.loading.showLoader();
    this.authService.getnotification(this.user.email).subscribe((res : any) => {
      this.loading.closeLoader();
      this.NotificationList = res.returnedObject;
      this.modal.dismiss();
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }

  async actionPrompt(selected) {
    debugger;
    console.log(selected);
    this.ItemSelected = selected;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Notification',
      message: 'What action would you like to perform on this notification?',
      buttons: [
        {
          text: 'View',
          cssClass: 'info',
          handler: (blah) => {
            this.getSingleNotification();
          }
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deletSingleNotification();
          }
        }
      ]
    });
  
    await alert.present();
  }

  getSingleNotification(){
    this.loading.showLoader();
    this.authService.getnotificationbyid(this.ItemSelected.id).subscribe((res : any) => {
      this.loading.closeLoader();
      localStorage.setItem('notificationdetails', JSON.stringify(res.returnedObject));
      this.route.navigate(['dashboard/notification-details']);
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    }) 
  }

  deletSingleNotification(){
    this.loading.showLoader();
    this.authService.deletenotificationbyid(this.ItemSelected.id).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alert.showSuccessAlert(res.message);
      location.reload();
      this.loading.closeLoader();
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }

  deleteAll(){
    this.loading.showLoader();
    this.authService.deleteallnotification(this.user.email).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alert.showSuccessAlert(res.message);
      location.reload();
      this.loading.closeLoader();
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }

  markAll(){
    this.loading.showLoader();
    this.authService.readallnotification(this.user.email).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alert.showSuccessAlert(res.message);
      location.reload();
      this.loading.closeLoader();
    }, error => {
      this.loading.closeLoader();
      this.alert.showErrorAlert(error.error.message);
    })
  }
}
