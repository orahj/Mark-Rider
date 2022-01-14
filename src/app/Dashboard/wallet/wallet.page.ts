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


  constructor(
    private route: Router,
    public modalController: ModalController,
    private authService : AuthService,
    private alertController : AlertController,
    private loading : LoadingService
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
            console.log('Confirm Ok');
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
            //  
           this.authService.getdeliverybyshipment(this.DeliveryNo).subscribe((res) => {
            this.loading.closeLoader;
            console.log(res);
          },error => {
            if(error){
              this.loading.closeLoader;
            }
          })
          }
        }
      ]
    });

    await alert.present();
  }

  public  payWithPaystack(){
    console.log('Amount2',this.Amount);
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
      callback: function(response){
        this.fundWallet(response);
    },
    onClose: function(){
      this.router.navigate(['dashboard/wallet']).then(()=>{});
    }
  });
  handler.openIframe();
  }

  fundWallet(){
    let customModel = {
        email: this.user.email,
        amount: 1000,
        userId: this.user.id,
        transactionRef: 1557016657
    }
    this.authService.fundwallet(customModel).subscribe((res) => {
      console.log(res);
    })
  }


  // fundWallet(){
  //   this.route.navigate(['/dashboard/fund-wallet']);
  // }
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
    this.authService.getwalletransaction(this.user.email).subscribe((res : any) => {
      console.log(res)
      if(res.isSuccessful == true) {
          this.WalletList = res.returnedObject;
      }
    })
  }

  getDelivery() {
    this.authService.getdelivery(this.user.email).subscribe((res) => {
      console.log(res);
      this.DeliveryList = res;
      // dateCreated
      // deliveryNo
      // totalAmount
    })
  }
}
