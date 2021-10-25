import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-fundwallet',
  templateUrl: './fundwallet.component.html',
  styleUrls: ['./fundwallet.component.scss'],
})
export class FundwalletComponent implements OnInit {

  constructor(private modalController: ModalController,private router: Router) { }

  ngOnInit() {}

  fundAccount(){
    this.router.navigate(['/dashboard/pay']);
    this.modalController.dismiss();
  }

}
