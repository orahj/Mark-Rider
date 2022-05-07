import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { RiderOnlineStatus } from 'src/app/_model/profileDto';
import { CancelDelivery } from 'src/app/_model/deliveryDto';
import { AlertService } from 'src/app/Services/alert/alert.service';

@Component({
  selector: 'app-rider-dashboard',
  templateUrl: './rider-dashboard.page.html',
  styleUrls: ['./rider-dashboard.page.scss'],
})
export class RiderDashboardPage implements OnInit {
earnings = 300000.958;
weeklyEarning = 10000.495
rate = 4;
goOnline =false;
theSate: boolean;
model : RiderOnlineStatus;
DeliveryList  : any;
user = JSON.parse(localStorage.getItem('userobj'));
SalesRecord : any;
CancellationReasons : any;
ReasonList : any;
cancelModel : CancelDelivery;
ItemSelected : any;
CancelReason : string;

_bState = false;
  constructor(
    private route: Router,
    private alertController: AlertController,
    private loading : LoadingService,
    private authService : AuthService,
    private alertService : AlertService,
    private modalController : ModalController
    ) { }

  ngOnInit() {
    this.getDelivery();
    this.getSaleRecord();
    this.getCancellationReasons();
    // this.modalController.dismiss();
    
  }

  // ionViewDidEnter() {
  //   this.modalController.dismiss();
  // }

  // ionViewWillEnter(){
  //   this.modalController.dismiss();
  // }

  viewDetails(){
    this.route.navigate(['/dashboard-details']);
  }
  async stateChange(event){
    if(event){
      const alert = await this.alertController.create({
        header: 'Alert',
        cssClass: 'my-custom-class',
        message: 'Are you sure you want to go online',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Go Online',
            handler: () => {
              console.log('Confirm Ok');
              let data = {
                userId : this.user.id,
                status : true
              }
              // this.loading.showLoader();
              this.authService.rideronlinestatus(data).subscribe((res) => {
                // this.loading.closeLoader();
              })
            }
          }
        ]
      });
      await alert.present();
    }
    else{
        const alert = await this.alertController.create({
          header: 'Alert',
          cssClass: 'my-custom-class',
          message: 'Are you sure you want go offline',
          buttons: ['Disagree', 'Agree']
        });
        await alert.present();
    console.log(event);
  }
}

async actionPrompt(selected) {
  this.ItemSelected = selected;
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Delivery Action',
    message: 'What action would you like to be perform on this delivery?',
    buttons: [
      {
        text: 'Start',
        cssClass: 'info',
        handler: (blah) => {
          this.startDelivery();
          console.log('Start Delivery');
        }
      }, {
        text: 'Cancel Delivery',
        cssClass: 'danger',
        handler: () => {
          this.presentConfirm();
          console.log('Cancel delivery Okay');
        }
      }
    ]
  });

  await alert.present();
}


async cancellationOptions() {
  let reasons = this.CancellationReasons[0].deliveryReason;
  this.CancellationReasons.forEach((reason) => {
    console.log('Reason List',reason.deliveryReason);
    this.ReasonList = reason.deliveryReason;
  })
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Select Cancellation reason',
    inputs: [
      {
        name: 'radio1',
        type: 'radio',
        label:  this.ReasonList,
        value: reasons, 
        handler: () => {
          console.log(reasons);
        },
        checked: true
      },
      {
        name: 'radio2',
        type: 'radio',
        label: 'Radio 2',
        value: 'value2',
        handler: () => {
          console.log('Radio 2 selected');
        }
      },
      {
        name: 'radio3',
        type: 'radio',
        label: 'Radio 3',
        value: 'value3',
        handler: () => {
          console.log('Radio 3 selected');
        }
      },
      {
        name: 'radio4',
        type: 'radio',
        label: 'Radio 4',
        value: 'value4',
        handler: () => {
          console.log('Radio 4 selected');
        }
      },
      {
        name: 'radio5',
        type: 'radio',
        label: 'Radio 5',
        value: 'value5',
        handler: () => {
          console.log('Radio 5 selected');
        }
      },
      {
        name: 'radio6',
        type: 'radio',
        label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
        value: 'value6',
        handler: () => {
          console.log('Radio 6 selected');
        }
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
        }
      }
    ]
  });

  await alert.present();
}

async presentConfirm() {

  // Object with options used to create the alert
  var options = {
    title: 'Cancellation Reasons',
    header: 'Select cancellation reason',
    // message: 'Which name do you like?',
    cssClass: 'my-custom-class',
    inputs : [],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
          console.log(data);
          this.CancelReason = data;
          this.cancelDelivery();
        }
      }
    ]
  };

  // Now we add the radio buttons
  for(let i=0; i< this.CancellationReasons.length; i++) {
    options.inputs.push({ name : 'options', value: this.CancellationReasons[i].deliveryReason, label: this.CancellationReasons[i].deliveryReason, type: 'radio' });
  }

  // Create the alert with the options
  let alert = await this.alertController.create(options);
  await alert.present();
}

async endeliveryPrompt(selected) {
  this.ItemSelected = selected;
  const alert = await this.alertController.create({
    header: 'Alert',
    cssClass: 'my-custom-class',
    message: 'Are you sure you want to end the delivery',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Complete Delivery',
        handler: () => {
          this.endDelivery();
          console.log('Confirm Ok');
        }
      }
    ]
  });
  await alert.present();
}

getDelivery() {
  //this.loading.showLoader();
  this.authService.getriderdelivery(this.user.email).subscribe((res : any) => {
    this.DeliveryList = res.returnedObject;
    //this.loading.closeLoader();
  },error => {
   // this.loading.closeLoader();
    this.alertService.showErrorAlert(error.error.message);
  })
}

getSaleRecord() {
  this.authService.getridersalesrecord(this.user.email).subscribe((res : any) => {
    this.SalesRecord = res.returnedObject;
  },error => {
    this.alertService.showErrorAlert(error.error.message);
  })
}

getCancellationReasons() {
  this.authService.getcancellationreason().subscribe((res : any) => {
    this.CancellationReasons = res;
  },error => {
    this.alertService.showErrorAlert(error.error.message);
  })
}

cancelDelivery(){
  let model = {
    appUserId : this.user.id,
    deliveriesId : this.ItemSelected.deliveriesId,
    reason : this.CancelReason
  }
  // this.cancelModel.appUserId = this.user.id;
  // this.cancelModel.deliveriesId = this.ItemSelected.id;
  // this.cancelModel.reason = this.CancelReason;
  //this.loading.showLoader();
  this.authService.canceldelivery(model).subscribe((res : any) => {
    //.loading.closeLoader();
    this.alertService.showSuccessAlert(res.message)
   //location.reload();
   this.ngOnInit();
   //this.loading.closeLoader();
  },error => {
    //this.loading.closeLoader();
    this.alertService.showErrorAlert(error.error.message);
  })
}

startDelivery() {
  let model = {
    appUserId : this.user.id,
    deliveriesId : this.ItemSelected.deliveriesId,
  }
  //this.loading.showLoader();
  this.authService.startdelivery(model).subscribe((res : any) => {
    //this.loading.closeLoader();
    this.alertService.showSuccessAlert(res.message);
    //location.reload();
    this.ngOnInit();
    //this.loading.closeLoader();
  }, error => {
    //this.loading.closeLoader();
    this.alertService.showErrorAlert(error.error.message);
  })
}

endDelivery(){
  let model = {
    appUserId : this.user.id,
    deliveriesId : this.ItemSelected.deliveriesId,
  }
  //this.loading.showLoader();
  this.authService.endelivery(model).subscribe((res : any) => {
    //this.loading.closeLoader();
    this.alertService.showSuccessAlert(res.message);
    //location.reload();
    this.ngOnInit();
    //this.loading.closeLoader();
  }, error => {
    //this.loading.closeLoader();
    this.alertService.showErrorAlert(error.error.message);
  })
}

goToItemSelected(selected){
  localStorage.setItem('deliverydetails', JSON.stringify(selected));
  this.route.navigate(['./dashboard/orders-details']);
}

}
