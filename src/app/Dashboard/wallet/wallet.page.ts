import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FundwalletComponent } from 'src/app/Modals/fundwallet/fundwallet.component';
import { TrackorderComponent } from 'src/app/Modals/trackorder/trackorder.component';
import { LoadingService } from '../../Services/loading/loading.service';
import { RegistrationDto } from 'src/app/_model/registrationDto';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { FundWallet } from 'src/app/_model/walletDto';


declare var PaystackPop: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  public wallet : boolean = true;
  public order : boolean = false;
  user = JSON.parse(localStorage.getItem('userobj'));
  public walletBalance : number;
  public walletTransactionDetails : any;
  public refCode : string = "DP-" + Math.floor((Math.random() * 1000000000) + 1);
  public Amount : any;
  model : FundWallet;
  public DeliveryNo : string;
  public DeliveryList : any;
  public WalletList : any;
  public DeliveryStatus : any
  public ItemSelected : any;
  public payStatus : any;
  public CancellationReasons : any;
  ReasonList : any;
  CancelReason : string;
  fieldValue : any;

  constructor(
    private route: Router,
    public modalController: ModalController,
    private authService : AuthService,
    private alertController : AlertController,
    private loading : LoadingService,
    private alertService : AlertService,
    
    ) { }

  ngOnInit() {
    this.getWalletBalance();
    this.getWalleTransaction();
    this.getDelivery();
    this.getCancellationReasons();
    // this.fundWallet();
  }

  ionViewDidEnter() {
    this.modalController.dismiss();
  } 

  async fundPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Fund Wallet',
      inputs: [
        {
          name: 'Amount',
          type: 'text',
          placeholder: 'Enter Amount'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Fund',
          handler: (value) => {
            this.Amount = value.Amount;
            if(this.Amount !== undefined && this.Amount !== ''){
              this.payWithPaystack();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async trackPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Track Delivery',
      inputs: [
        {
          name: 'Track',
          type: 'text',
          placeholder: 'Enter Delivery No'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           // console.log('Confirm Cancel');
          }
        }, {
          text: 'Track',
          handler: (value) => {
            if(this.DeliveryNo !== undefined && this.DeliveryNo !== ''){
              this.DeliveryNo = value.Track;
              this.loading.showLoader();
             this.authService.getdeliverybyshipment(this.DeliveryNo, this.user.email).subscribe((res : any) => {
              this.loading.closeLoader;
              localStorage.setItem('trackdeliverydetails', JSON.stringify(res));
              this.route.navigate(['dashboard/track-orders']).then(()=>{});
              this.modalController.dismiss();
            },error => {
              if(error){
                this.loading.closeLoader;
                this.alertService.showErrorAlert(error.error.message);
              }
            })
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async disputePrompt(selected) {
    this.ItemSelected = selected;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dispute',
      message: 'Are you sure you want to put this delivery in dispute?',
      inputs : [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Dispute reasons'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'info',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Dispute',
          cssClass: 'danger',
          handler: () => {
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

  async cancelDelivery(selected) {

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
          handler: reason => {
            console.log(reason);
            // this.CancelReason = data;
            let data = {
              userId : this.user.id,
              deliveriesId : selected.id,
              reason : reason
            }
            this.loading.showLoader();
            this.authService.canceldeliverybyuser(data).subscribe((res : any) => {
              this.loading.closeLoader();
              this.alertService.showSuccessAlert(res.message);
              location.reload();
            },error => {
                this.loading.closeLoader();
                this.alertService.showErrorAlert(error.error.message);
            })
            // this.cancelDelivery();
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

  async cancelDelivery1(selected) {
    // Object with options used to create the alert
    var options = {
      title: 'Cancellation Deliverhy',
      header: 'Select cancellation reason',
      // message: 'Which name do you like?',
      cssClass: 'my-custom-class',
      inputs : [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Cancellation reasons'
        },
      ],
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Cancel Delivery',
          handler: (value) => {
            let data = {
              userId : this.user.id,
              deliveriesId : selected.id,
              reason : value.reason
            }
            this.loading.showLoader();
            this.authService.canceldeliverybyuser(data).subscribe((res : any) => {
              this.loading.closeLoader();
              this.alertService.showSuccessAlert(res.message);
              location.reload();
            },error => {
                this.alertService.showErrorAlert(error.error.message);
            })
          }
        }
      ]
    };
    // Create the alert with the options
  }

  async cancelDeliveryByUser(selected) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cancel',
      message: 'Are you sure you want to cancel this delivery?',
      buttons: [
        {
          text: 'Close',
          cssClass: 'info',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Cancel delivery',
          cssClass: 'danger',
          handler: () => {
            let data = {
              userId : this.user.id,
              deliveriesId : selected.id,
              reason : ''
            }
            this.loading.showLoader();
            this.authService.canceldeliverybyuser(data).subscribe((res : any) => {
              this.loading.closeLoader();
              this.alertService.showSuccessAlert(res.message);
              location.reload();
            },error => {
                this.loading.closeLoader();
                this.alertService.showErrorAlert(error.error.message);
            })
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  public  payWithPaystack(){
    return new Promise( (resolve,reject) => {
      console.log('Amount',this.Amount)
    if(this.Amount !== undefined || this.Amount !== ''){
      var handler = PaystackPop.setup({
        key: 'pk_test_2ae6eeddbe5dded1d9ae213cd0a217686aa7286d',
        email: this.user.email,
        ref : this.refCode,
        amount: this.Amount + "00", 
        metadata: {
          custom_fields: [
            {
              display_name: "Paid via",
              variable_name: "paid_via",
              value: 'Mark Riders'
            },
            {
              display_name: "Mobile Number",
              variable_name: "mobile_number",
              value: this.user.phone
            }
          ]
        },
        
        callback:(response) => {
          let customModel = {
            email: this.user.email,
            amount: parseInt(this.Amount, 10) + '00',
            userId: this.user.id,
            transactionRef: response.reference
        }
        this.loading.showLoader();
        this.authService.fundwallet(customModel).subscribe((res : any) => {
          this.loading.closeLoader();
          this.alertService.showSuccessAlert(res.message);
          location.reload();
          this.loading.closeLoader();
        }, error => {
          this.loading.closeLoader();
          this.alertService.showErrorAlert(error.error.messsage);
         
        })
      },
      
      onClose: function(res){
        reject(res)
        this.router.navigate(['dashboard/wallet']).then(()=>{});
      },
      
    
    });
   
    handler.openIframe();
    this.payStatus = PaystackPop;
    }
    else {
      alert('Amount is required');
    }
});
  }

  fundWallet(){
    let customModel = {
        email: this.user.email,
        amount: this.Amount,
        userId: this.user.id,
        transactionRef: 1557016657
    }
    this.authService.fundwallet(customModel).subscribe((res) => {
    })
  }

  walletTransaction(){
    this.route.navigate(['/dashboard/wallet-transaction']);
  }

  async showFundModal() {
    const modal = await this.modalController.create({
      component: FundwalletComponent,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
  }
  async showTrackModal() {
    const modal = await this.modalController.create({
      component: TrackorderComponent,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
  }

  switchWallet() {
    this.wallet = true;
    this.order = false;
  }

  switchOrder() {
    this.order = true;
    this.wallet = false;
  }

  getWalletBalance(){
      this.authService.getwalletbalance(this.user.email).subscribe((res : any) => {
        this.walletBalance = res.returnedObject.balance;
      }, error => {
        this.alertService.showErrorAlert(error.error.message);
      })
  }

  getWalleTransaction(){
    this.loading.showLoader();
    this.authService.getwalletransaction(this.user.email).subscribe((res : any) => {
    
      if(res.isSuccessful == true) {
          this.WalletList = res.returnedObject;
      }
      this.loading.closeLoader();
      this.modalController.dismiss();
    }, error => {
      this.loading.closeLoader();
      this.modalController.dismiss();
      this.alertService.showErrorAlert(error.error.message);
    })
  }

  getDelivery() {
    this.authService.getdelivery(this.user.email).subscribe((res) => {
      this.DeliveryList = res;
    })
  }


  async completedDelivery(selected) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'What action would you like to be perfrom on this delivery?',
      buttons: [
        {
          text: 'Dispute',
          cssClass: 'info',
          handler: () => {
            this.loading.showLoader();
            this.authService.getdeliveryitem(selected.id).subscribe((res: any) => {
              this.loading.closeLoader();
              localStorage.setItem('deliverydetails', JSON.stringify(res));
              this.route.navigate(['./dashboard/orders-details']);
            }, error => {
              this.loading.closeLoader();
              this.alertService.showErrorAlert(error.error.message);
            })
          }
        }, {
          text: 'Complete Delivery',
          cssClass: 'danger',
          handler: () => {
            let model = {
              appUserId : this.user.id,
              deliveriesId : selected.deliveryItems[0].deliveryId,
              rating : 0,
              ratingcomment : ''
            }
            this.loading.showLoader();
            this.authService.completedelivery(model).subscribe((res: any) => {
              this.loading.closeLoader();
              this.alertService.showSuccessAlert(res.message);
            }, error => {
              this.loading.closeLoader();
              this.alertService.showErrorAlert(error.error.message);
            })
          }
        }
      ]
    });
  
    await alert.present();
  }


  deliveryDetail(selected){
    this.loading.showLoader();
    this.authService.getdeliveryitem(selected.id).subscribe((res: any) => {
      this.loading.closeLoader();
      localStorage.setItem('deliverydetails', JSON.stringify(res));
      this.route.navigate(['./dashboard/orders-details']);
    }, error => {
      this.alertService.showErrorAlert(error.error.message);
    })
  }

  cancelDeliveryByUser1(selected){
    let data = {
      userId : this.user.id,
      deliveriesId : selected.id,
      reason : ''
    }
    this.loading.showLoader();
    this.authService.canceldeliverybyuser(data).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message);
      location.reload();
    },error => {
        this.loading.closeLoader();
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


}
