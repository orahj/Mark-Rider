import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-options',
  templateUrl: './sign-up-options.page.html',
  styleUrls: ['./sign-up-options.page.scss'],
})
export class SignUpOptionsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotouserSignup(){
    this.router.navigate(['/sign-up']);
  }
  gotoriderSignup(){
    this.router.navigate(['/rider-sign-up']);
  }
}
