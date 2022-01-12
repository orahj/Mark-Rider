import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { RiderOnlineStatus } from 'src/app/_model/profileDto';


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
model : RiderOnlineStatus;
user = JSON.parse(localStorage.getItem('userobj'));
_bState = false;
  constructor(
    private route: Router,
    private alertController: AlertController,
    private loading : LoadingService,
    private authService : AuthService
    ) { }

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
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Go Online',
            handler: () => {
              console.log('Confirm Ok');
              let data = {
                userId : this.user.id,
                status : true
              }
              this.loading.showLoader();
              this.authService.rideronlinestatus(data).subscribe((res) => {
                this.loading.closeLoader();
              })
            }
          }
        ]
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
