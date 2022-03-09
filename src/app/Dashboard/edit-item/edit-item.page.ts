import { Component, OnInit, ViewChild, ElementRef, NgZone, } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { newItemObj } from 'src/app/_model/newItemObj';
import { Router } from '@angular/router';
import { MapsAPILoader} from '@agm/core';
import { BehaviorSubject } from "rxjs";
import LocationPicker from "location-picker";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  @ViewChild('senderSearch')
  public senderSearchElementRef: ElementRef;
  @ViewChild('receiverSearch')
  public receiverSearchElementRef: ElementRef;
  lp: LocationPicker;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  baseLocation : any;
  targetLocation : any;
  baseAddress : string;
  targetAddress : string;

  Image : any;
  EditItem = JSON.parse(localStorage.getItem('edititem'));
  deliveryObj = JSON.parse(localStorage.getItem('deliveryObj'));
  objIndex;
  updateItem;
  constructor(
    private loading : LoadingService,
    private authService : AuthService,
    private alertService : AlertService,
    private router : Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
    console.log(this.EditItem);
    this.deliveryObj.push({...this.EditItem});
    localStorage.setItem('deliveryObj', JSON.stringify(this.deliveryObj));
    this.router.navigateByUrl('/dashboard/checkout');
  }

  addItem() {
    // this.itemObj.push({...this.newItem});
    // localStorage.setItem('deliveryObj', JSON.stringify(this.itemObj));
    // this.router.navigateByUrl('/dashboard/checkout');
  }

  public senderAutocomplete() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.senderSearchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          let location = {
            lat :  place.geometry.location.lat(),
            lng : place.geometry.location.lng()
          }
  
          // localStorage.setItem('senderlocation', JSON.stringify(location));

          this.baseLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }
          this.EditItem.baseLocation = this.baseLocation;
          // for(let i = 0; i < this.itemList.length; i++) {
          //   this.itemList[i].baseLocation = this.baseLocation;
          // }
          this.baseAddress = place.formatted_address;
            // localStorage.setItem('senderaddress', JSON.stringify(this.baseLocation));
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 8;
          });
        });
      });
  }

  public receiverAutocomplete() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.receiverSearchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          let location = {
            lat :  place.geometry.location.lat(),
            lng : place.geometry.location.lng()
          }
          // localStorage.setItem('receiverlocation', JSON.stringify(location));

          this.targetLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }

          // localStorage.setItem('receiveraddress', JSON.stringify(this.targetLocation));
          // for(let i = 0;  i < this.itemList.length; i++) {
          //   this.itemList[i].targetLocation = this.targetLocation;
          // }
          this.EditItem.targetLocation = this.targetLocation;
          this.targetAddress = place.formatted_address; 
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 5;
          });
        });
      });
      // let SenderLocation = JSON.parse(localStorage.getItem('senderlocation'));
      // let ReceiverLocation = JSON.parse(localStorage.getItem('receiverlocation'));
  }

}
