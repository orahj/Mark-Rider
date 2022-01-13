import { Component, OnInit, ViewChild, ElementRef, NgZone, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderPage } from 'src/app/Modals/product/type-one/order/order.page';
import { AddDropOffAddressPage } from '../add-drop-off-address/add-drop-off-address.page';
import { AddDropOffAddressesPage } from '../add-drop-off-addresses/add-drop-off-addresses.page';
import { MapsAPILoader} from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemList } from 'src/app/_model/itemListDto';
import { LoadingService } from '../../Services/loading/loading.service';
import { AuthService } from 'src/app/Services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('senderSearch')
  public senderSearchElementRef: ElementRef;
  @ViewChild('receiverSearch')
  public receiverSearchElementRef: ElementRef;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  baseLocation : any;
  targetLocation : any;
  formData: FormGroup;
  searchTerm:any;
  baseAddress : string;
  Image : any;
  targetAddress : string;
  carrier : number = 0;
  user = JSON.parse(localStorage.getItem('userobj'));
  itemList = ItemList;
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };
  isscheduled = false;
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };
  single = false;
  bulkdelivery = false;
  submitted = false;
  constructor(
    private route: Router,
    private modalController : ModalController,
    public alertController: AlertController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private form: FormBuilder,
    private loading : LoadingService,
    private authService : AuthService
    ) {
    
   }



  ngOnInit() {
    this.initializeForm();
    this.setCurrentLocation();
  
  }
  fundWallet(){
    this.route.navigate(['/dashboard/fund-wallet']);
  }
  orderdetails(){
    this.route.navigate(['/dashboard/orders-details/:id'])
  }
  focusesInput(){
    console.log(this.searchTerm)
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
    //this.uploadImage();
    }
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
          this.baseLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }
          for(let i = 0; i < this.itemList.length; i++) {
            this.itemList[i].baseLocation = this.baseLocation;
          }
          this.baseAddress = place.formatted_address;
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
          this.targetLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }

          for(let i = 0;  i < this.itemList.length; i++) {
            this.itemList[i].targetLocation = this.targetLocation;
          }
          this.targetAddress = place.formatted_address; 
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 8;
          });
        });
      });
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 8;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  initializeForm() {
    this.formData = this.form.group({
      pickUpItems: ['', [Validators.required]],
      deliveryTpe: ['', [Validators.required]],
      deliveryTime: ['', [Validators.required]],  
      pickUpPhone: ['', [Validators.required]],
      carriers:[1, [Validators.min(this.carrier),Validators.pattern(/^[1-9]\d*$/) ]],
      deliveryId:[1, [Validators.required]],
      dropOffPhone: ['', [Validators.required]],
      imageUrl: [this.Image, [Validators.required]],
      // scheduledDeliveryDate : [''],
      baseLocation : [this.baseAddress, Validators.required],
      targetLocation : [this.targetAddress, Validators.required]
      
    },
    );
  }

  getCarrier(selected){
      this.carrier = selected;
      console.log('carrier',this.carrier)
      for(let i = 0; i < this.itemList.length; i++) {
        this.itemList[i].carriers = selected;
      }
  }

  async orderProduct(){
    const modal = await this.modalController.create({
      component: OrderPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });

    return await modal.present();
  }
  async onChange(event){
  //alert(event);
  if(event =='single'){
    this.single = true;
    this.bulkdelivery = false;
  }
  if(event =='bulk'){
    this.bulkdelivery = true;
    this.single = false;  
  }
  if(event == 'cargo' || event =='interstate'){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'This service is not available at the moment',
      buttons: ['OK']
    });
  
    await alert.present();
  }
 
  }
  scheduled(){
    this.isscheduled = true;
  }
  rightaway(){
    this.isscheduled = false;
  }
  notavailble(){
    alert("Not available at the moment!")
  }
  async addresslist(){
    debugger;
    const modal = await this.modalController.create({
      component: AddDropOffAddressPage,
      cssClass: 'custom_network_modal',
      backdropDismiss: true
    });
    return await modal.present();
}
async addAddress(){
  const modal = await this.modalController.create({
    component: AddDropOffAddressesPage,
    cssClass: 'custom_network_modal',
    backdropDismiss: true
  });
  return await modal.present();
}


get f() { return this.formData.controls; }

public onSubmit() : void {
 // console.table(this.formData.value);
  console.table(this.formData);
  this.submitted = true;
  if(this.formData.invalid){
    return;
  }
  localStorage.setItem('deliveryObj', JSON.stringify(this.itemList));
  let data = {
    email: this.user.email,
    deliveryItems : this.itemList
  }
 
  this.loading.showLoader();
  this.authService.createdelivery(data).subscribe((res : any) => {
    if(res.isSuccessful === true ){
      let returnObj = {
        deliveryNo: res.returnedObject.deliveryNo,
        totalAmount : res.returnedObject.totalAmount,
        transactionId : res.returnedObject.transactionId
      }
      localStorage.setItem('deliveryReturnedObj', JSON.stringify(returnObj));
      this.loading.closeLoader();
      this.orderProduct();
    }
  })
}

}
