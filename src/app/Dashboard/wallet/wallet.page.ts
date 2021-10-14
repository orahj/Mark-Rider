import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  fundWallet(){
    this.route.navigate(['/dashboard/fund-wallet']);
  }
  walletTransaction(){
    this.route.navigate(['/dashboard/wallet-transaction']);
  }
}
