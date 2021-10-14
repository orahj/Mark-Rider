import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-drop-off-addresses',
  templateUrl: './add-drop-off-addresses.page.html',
  styleUrls: ['./add-drop-off-addresses.page.scss'],
})
export class AddDropOffAddressesPage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }
  addAddress(){
    this.modalController.dismiss();
  }
}
