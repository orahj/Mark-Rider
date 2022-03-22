import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { newItemObj } from 'src/app/_model/newItemObj';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  Image : any;
  newItem : newItemObj = new newItemObj;
  itemObj = JSON.parse(localStorage.getItem('deliveryObj'));
  senderAddress = JSON.parse(localStorage.getItem('senderaddress'));
  receiverAddress = JSON.parse(localStorage.getItem('receiveraddress'));
  constructor(
    private loading : LoadingService,
    private authService : AuthService,
    private alertService : AlertService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onFileChanged(fileInput: any) {
    var reader = new FileReader();  
    this.Image = <File>fileInput.target.files[0];
    var mimeType =  this.Image.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    reader.readAsDataURL(this.Image); 
    reader.onload = (_event) => { 
    let TheFileContents = reader.result;
    document.getElementById("TheImageContents").innerHTML = '<img width="50" height="50"  src="'+TheFileContents+'" />';
    console.log('Image Div',document.getElementById("TheImageContents"))
    this.loading.showLoader();
    this.authService.fileupload( this.Image).subscribe((res : any) => {
      if(res.isSuccessful === true){
          this.newItem.imageUrl = res.returnedObject.url;
          this.Image =  this.newItem.imageUrl;
          document.getElementById("TheImageContents").innerHTML = '<img width="50" height="50"  src="'+this.newItem.imageUrl+'" />';
      }
      this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message)
    }, error => {
      this.loading.closeLoader();
      this.alertService.showErrorAlert(error.error.message);
    })
    }
  }

  uploadImage(){
    this.loading.showLoader();
    this.authService.fileupload(this.Image).subscribe((res : any) => {
      this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message)
    }, error => {
      this.loading.closeLoader();
      this.alertService.showErrorAlert(error.error.message);
    })
  }

  addItem() {
    this.newItem.deliveryTpe = 1;
    this.newItem.baseLocation = this.senderAddress;
    this.newItem.targetLocation = this.receiverAddress;
    this.itemObj.push({...this.newItem});
    localStorage.setItem('deliveryObj', JSON.stringify(this.itemObj));
    this.router.navigateByUrl('/dashboard/checkout', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/dashboard/checkout"]);
      });
  }


}
