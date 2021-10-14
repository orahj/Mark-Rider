import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-drop-off-address',
  templateUrl: './add-drop-off-address.page.html',
  styleUrls: ['./add-drop-off-address.page.scss'],
})
export class AddDropOffAddressPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  trash(){
    alert('Trashed!')
  }
}
