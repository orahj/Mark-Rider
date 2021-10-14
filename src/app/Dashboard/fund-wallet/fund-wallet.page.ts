import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.page.html',
  styleUrls: ['./fund-wallet.page.scss'],
})
export class FundWalletPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fundAccount(){
    this.router.navigate(['/dashboard/pay']);
  }

}
