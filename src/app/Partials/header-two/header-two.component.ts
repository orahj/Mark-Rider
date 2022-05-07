import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss'],
})
export class HeaderTwoComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('userobj'));
  constructor(
    private route: Router, 
    private _location:Location,
    private authService : AuthService) { }
  // @Input() title: any;
  @Input() title: string;
  NotificationList : any;
  ngOnInit() {
    this.getNotification();
    console.log('List', this.NotificationList)
  }

  goBack(){
    this._location.back();
  }
  
  gotoHome(){
    debugger;
    const user = JSON.parse(localStorage.getItem('user'));
    if(user.userTypes === 4) {
      this.route.navigateByUrl('/dashboard');
    }
    else if(user.userTypes === 3) {
      this.route.navigateByUrl('/rider-dashboard');
    }
    //this.route.navigate(['/dashboard']);
  }

  focusesInput(){
    // console.log(this.searchTerm)
  }

  notification(){
    this.route.navigate(['/dashboard/notification']);
  }

  cart(){
    this.route.navigate(['/dashboard/checkout']);
  }

  getNotification(){
    location.reload;
    this.authService.getnotification(this.user.email).subscribe((res : any) => {
      this.NotificationList = res.returnedObject;
      console.log('Notification List',this.NotificationList);
    })
  }
}
