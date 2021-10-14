import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
_bState = false;
  constructor(private route: Router, private alertController: AlertController) { }

  ngOnInit() {
  }
  viewDetails(){
    this.route.navigate(['/dashboard-details']);
  }
  async stateChange(event){
    if(event){
      const alert = await this.alertController.create({
        header: 'Alert',
        cssClass: 'my-custom-class',
        message: 'Are you sure you want go online',
        buttons: ['Disagree', 'Agree']
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
}
