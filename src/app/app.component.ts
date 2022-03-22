import { Component, OnInit, OnChanges } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from './Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { EventService } from './Services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  public DeliveryNo : string;
  public NotificationList : any;
  user : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private route: Router,
    private alertController : AlertController,
    private loading : LoadingService,
    private authService : AuthService,
    private modalController : ModalController,
    private alertService : AlertService,
    private events: EventService
  ) {
  }

  ngOnInit() {
    this.initializeApp();
    this.user = JSON.parse(localStorage.getItem('userobj'));
  }

  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem('userobj'));
  } 

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('userobj'));
  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.events.getObservable().subscribe((data) => {
      console.log("Data received:", data);
      this.user = JSON.parse(localStorage.getItem('userobj'));
    })
  }  
  
  gotoViewProfile(){
    this.route.navigate(['/dashboard/view-profile']);
    this.menu.close();
  }

    
  gotoRiderProfile(){
    this.route.navigate(['/dashboard/edit-profile-rider']);
    this.menu.close();
  }

  gotoAbout(){
    this.route.navigate(['/dashboard/page/about']);
    this.menu.close();
  }

  gotoHome(){
    this.route.navigate(['/dashboard/']);
    this.menu.close();
  }

  gotoRiderHome(){
    this.route.navigate(['/rider-dashboard']);
    this.menu.close();
  }

  gotoWallet(){
    this.route.navigate(['/dashboard/wallet']);
    this.menu.close();
  }

  gotoOrders(){
    this.route.navigate(['/dashboard/orders']);
    this.menu.close();
  }

  gotoTrackOrders(){
    this.route.navigate(['/dashboard/track-orders']);
    this.menu.close();
  }

  addAddress() {
    this.route.navigate(['/dashboard/add-address']);
    this.menu.close();
  }

  notificationList() {
    this.route.navigate(['dashboard/notification']);
    this.menu.close();
  }

  logOut() {
    // localStorage.removeItem('token');
    localStorage.clear();
    this.route.navigate(['/login']);
    this.menu.close();
   }

   async trackPrompt() {
    this.menu.close();
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
          text: 'Track',
          handler: (value) => {
            this.DeliveryNo = value.Track;
            this.loading.showLoader();
           this.authService.getdeliverybyshipment(this.DeliveryNo, this.user.email).subscribe((res : any) => {
            this.loading.closeLoader;
            localStorage.setItem('trackdeliverydetails', JSON.stringify(res));
            this.route.navigate(['dashboard/track-orders']).then(()=>{});
            this.modalController.dismiss();
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

  getNotification(){
    this.authService.getnotification(this.user.email).subscribe((res : any) => {
      this.NotificationList = res.returnedObject;
    })
  }

  reloadpage() {
    location.reload();
  }

}
