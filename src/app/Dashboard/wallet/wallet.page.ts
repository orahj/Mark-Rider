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
  public name = 'tomi';

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
    // this.fundWallet();
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Fund',
          handler: (value) => {
            console.log(value.Amount);
            this.Amount = value.Amount;
            this.payWithPaystack();
            console.log('Confirm Ok', value.Amount);
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
          text: 'Fund',
          handler: (value) => {
            this.DeliveryNo = value.Track;
            this.loading.showLoader();
           this.authService.getdeliverybyshipment(this.DeliveryNo, this.user.email).subscribe((res : any) => {
            this.loading.closeLoader;
            localStorage.setItem('trackdeliverydetails', JSON.stringify(res));
            this.route.navigate(['dashboard/track-orders']).then(()=>{});
          },error => {
            if(error){
              this.loading.closeLoader;
              this.alertService.showErrorAlert(error.error.message);
            }
          })
          }
        }
      ]
    });

    await alert.present();
  }

  async disputePrompt(selected) {
    console.log(selected);
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
            console.log('Cancel');
          }
        }, {
          text: 'Dispute',
          cssClass: 'danger',
          handler: () => {
            console.log('Cancle delivey Okay');
          }
        }
      ]
    });
  
    await alert.present();
  }

  async cancelDelivery(selected) {
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Cancel Delivery',
          handler: (value) => {
            console.log('Confirm Ok');
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
  
  public  payWithPaystack(){
    return new Promise( (resolve,reject) => {
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
  console.log('Paystack Pop',PaystackPop);
  this.payStatus = PaystackPop;
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
      console.log(res);
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
        console.log(res)
        this.walletBalance = res.returnedObject.balance;
      })
  }

  getWalleTransaction(){
    this.loading.showLoader();
    this.authService.getwalletransaction(this.user.email).subscribe((res : any) => {
      console.log(res)
    
      if(res.isSuccessful == true) {
          this.WalletList = res.returnedObject;
      }
      this.loading.closeLoader();
    }, error => {
      this.alertService.showErrorAlert(error.error.message);
    })
  }

  getDelivery() {
    this.authService.getdelivery(this.user.email).subscribe((res) => {
      console.log(res);
      this.DeliveryList = res;
    })
  }

  deliveryDetail(selected){
    this.loading.showLoader();
    this.authService.getdeliveryitem(selected.id).subscribe((res: any) => {
      this.loading.closeLoader();
      localStorage.setItem('deliverydetails', JSON.stringify(res));
      this.route.navigate(['./dashboard/orders-details']);
      console.log(res);
    }, error => {
      this.alertService.showErrorAlert(error.error.message);
    })
  }
 


}
