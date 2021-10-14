import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss'],
})
export class HeaderTwoComponent implements OnInit {

  constructor(private route: Router, private _location:Location) { }
  // @Input() title: any;
  @Input() title: string;
  ngOnInit() {
  }

  goBack(){
    this._location.back();
  }
  
  gotoHome(){
    this.route.navigate(['/dashboard']);
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

}
