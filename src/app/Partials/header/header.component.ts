import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };

  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };
  searchTerm: string;
  constructor(private route: Router) { }
 
  ngOnInit() {}

  focusesInput(){
    console.log(this.searchTerm)
  }

  notification(){
    this.route.navigate(['dashboard/notification']);
  }

  gotoHome(){
    this.route.navigate(['dashboard']);
  }

  cart(){
    this.route.navigate(['/dashboard/checkout']);
  }
}
