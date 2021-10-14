import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-transaction',
  templateUrl: './wallet-transaction.page.html',
  styleUrls: ['./wallet-transaction.page.scss'],
})
export class WalletTransactionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  submitReview(){
    alert('clicked');
  }
  gotoOrderDetails(){}
}
