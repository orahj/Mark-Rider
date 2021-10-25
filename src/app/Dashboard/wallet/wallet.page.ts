import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FundwalletComponent } from 'src/app/Modals/fundwallet/fundwallet.component';
import { TrackorderComponent } from 'src/app/Modals/trackorder/trackorder.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  public wallet : boolean = true;
  public order : boolean = false;

  constructor(
    private route: Router,
    public modalController: ModalController
    ) { }

  ngOnInit() {
  }

  fundWallet(){
    this.route.navigate(['/dashboard/fund-wallet']);
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
}
