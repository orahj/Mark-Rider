import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { FundWallet } from '../../_model/walletDto';
declare var PaystackPop: any;

@Component({
  selector: 'app-fundwallet',
  templateUrl: './fundwallet.component.html',
  styleUrls: ['./fundwallet.component.scss'],
})
export class FundwalletComponent implements OnInit {
  public refCode : string = "DP-" + Math.floor((Math.random() * 1000000000) + 1);
  user = JSON.parse(localStorage.getItem('userobj'));
  public Amount : any;
  model : FundWallet;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private authService : AuthService
    ) { }

  ngOnInit() {
    console.log('Amount',this.Amount);
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
        this.fundWallet();
    },
    onClose: function(){
      this.router.navigate(['dashboard/wallet']).then(()=>{});
    }
  });
  handler.openIframe();
  }

  // amoutVal() {
  //   console.log(this.Amount);
  // }

  // fundWallet(){
  //   this.model.amount = this.Amount;
  //   this.model.email = this.user.email;
  //   this.model.userId = this.user.id;
  //   this.authService.fundwallet(this.model).subscribe((res) => {
  //     console.log(res);
  //   })
  // }


  fundAccount(){
    this.router.navigate(['/dashboard/pay']);
    this.modalController.dismiss();
  }

}
