import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private route: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  
  gotoViewProfile(){
    this.route.navigate(['/dashboard/view-profile']);
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

}
