import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 1,
    speed: 2000,
    autoplayDisableOnInteraction: false,
    autoplay : {
      disableOnInteraction: false
    }
  };

  constructor(private router: Router) {}
  
  gotoSignUp(){
    this.router.navigate(['/sign-up-option'])
  }
 
  gotoLogin(){
    this.router.navigate(['/login']);
  }

  slidesDidLoad(slides) {
    slides.startAutoplay();
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
   }
}
