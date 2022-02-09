import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { newItemObj } from 'src/app/_model/newItemObj';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  Image : any;
  EditItem = JSON.parse(localStorage.getItem('edititem'));
  deliveryObj = JSON.parse(localStorage.getItem('deliveryObj'));
  objIndex;
  updateItem;
  constructor(
    private loading : LoadingService,
    private authService : AuthService,
    private alertService : AlertService,
    private router : Router
  ) { }

  ngOnInit() {
    this.Edit();
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
    this.loading.showLoader();
    this.authService.fileupload( this.Image).subscribe((res : any) => {
      if(res.isSuccessful === true){
          this.EditItem.imageUrl = res.returnedObject.url;
          this.Image =  this.EditItem.imageUrl;
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

  public Edit() {
  
  }

  public UpdateItem(){
    this.updateItem = this.EditItem;
    // let index = this.deliveryObj.indexOf(this.EditItem)
    // this.deliveryObj[this.EditItem];
    // let newObject = this.EditItem;
    // console.log('Baby', this.deliveryObj[this.updateItem]);
    // console.log('Updated Delivery Object',this.deliveryObj);
    // localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
    // this.router.navigateByUrl('/dashboard/checkout');

    let data = this.updateItem; 
    console.log('Data',data) 
    for (let i = 0; i < this.deliveryObj.length; i++) {  
      if (i == data) {  
        this.deliveryObj[i].Value = this.updateItem.Value;  
        this.deliveryObj[this.updateItem.Value];
      }  
    } 
    localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
       this.router.navigateByUrl('/dashboard/checkout');
  }

  addItem() {
    // this.itemObj.push({...this.newItem});
    // localStorage.setItem('deliveryObj', JSON.stringify(this.itemObj));
    // this.router.navigateByUrl('/dashboard/checkout');
  }

}
