import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { newItemObj } from 'src/app/_model/newItemObj';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  @ViewChild('receiverSearch')
  public receiverSearchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  Image : any;
  targetLocation : any;
  newItem : newItemObj = new newItemObj;
  itemObj = JSON.parse(localStorage.getItem('deliveryObj'));
  senderAddress = JSON.parse(localStorage.getItem('senderaddress'));
  senderLocation = JSON.parse(localStorage.getItem('senderlocation'));
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
    this.loading.showLoader();
    this.authService.fileupload( this.Image).subscribe((res : any) => {
      if(res.isSuccessful === true){
          this.newItem.imageUrl = res.returnedObject.url;
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

          this.targetLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }
          this.newItem.targetLocation = this.targetLocation;
  
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 8;
          });
        });
      });
  }

  addAddress() {
    this.newItem.carriers = 1;
    this.newItem.deliveryId = 0;
    this.newItem.deliveryTime = 1;
    this.newItem.deliveryTpe = 2;
    this.newItem.baseLocation = this.senderAddress;
    console.log('New Item Object', this.newItem);
    this.itemObj.push({...this.newItem});
    console.log('Updated Array', this.itemObj);
    console.log('new item added with dash', {...this.newItem});
    localStorage.setItem('deliveryObj', JSON.stringify(this.itemObj));
    this.router.navigateByUrl('/dashboard/checkout');
  }

}
