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
import { BehaviorSubject } from "rxjs";
import LocationPicker from "location-picker";
import { AlertService } from 'src/app/Services/alert/alert.service';

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
  lp: LocationPicker;
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
  imageurl : any;
  origin: {};
  destination: {};
  distance: any;
  NotificationList : any | [];

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
  loacation : {
    lat : 0,
    lng : 0
  }
  locations : Array<object>;

  constructor(
    private route: Router,
    private modalController : ModalController,
    public alertController: AlertController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private form: FormBuilder,
    private loading : LoadingService,
    private authService : AuthService,
    private alertService : AlertService
    ) {
    
   }


  ngOnInit() {
    debugger;
    this.loadNotification();
    this.initializeForm();
    this.setCurrentLocation();
  }

  bulkDelivery(){
    this.bulkdelivery = true;
  }
 loadNotification(){
  //this.loading.showLoader();
  this.authService.getnotification(this.user.email).subscribe((res : any) => {
    //this.loading.closeLoader();
    this.NotificationList = res.returnedObject;
  }, error => {
    //this.loading.closeLoader();
  })
   
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
    //this.loading.showLoader();
    this.authService.fileupload( this.Image).subscribe((res : any) => {

      if(res.isSuccessful === true){
        for(let i = 0; i < this.itemList.length; i++) {
          this.itemList[i].imageUrl = res.returnedObject.url;
        }
      }
      //this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message)
    }, error => {
      //this.loading.closeLoader();
      this.alertService.showErrorAlert(error.error.message);
    })
    }
  }

  uploadImage(){
    //this.loading.showLoader();
    this.authService.fileupload(this.Image).subscribe((res : any) => {
      //this.loading.closeLoader();
      this.alertService.showSuccessAlert(res.message)
    }, error => {
      //this.loading.closeLoader();
      this.alertService.showErrorAlert(error.error.message);
    })
  }

  public markers = new BehaviorSubject<any[]>(null);

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
  
          localStorage.setItem('senderlocation', JSON.stringify(location));

          this.baseLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }
          for(let i = 0; i < this.itemList.length; i++) {
            this.itemList[i].baseLocation = this.baseLocation;
          }
          this.baseAddress = place.formatted_address;
            localStorage.setItem('senderaddress', JSON.stringify(this.baseLocation));
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
          debugger;
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
          localStorage.setItem('receiverlocation', JSON.stringify(location));

          this.targetLocation = {
            address:  place.formatted_address,
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          }
          localStorage.setItem('receiveraddress', JSON.stringify(this.targetLocation));
          for(let i = 0;  i < this.itemList.length; i++) {
            this.itemList[i].targetLocation = this.targetLocation;
          }
          this.targetAddress = place.formatted_address; 
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 5;
          });
        });
      });
      let SenderLocation = JSON.parse(localStorage.getItem('senderlocation'));
      let ReceiverLocation = JSON.parse(localStorage.getItem('receiverlocation'));
      this.locations  = [
        {lat: SenderLocation.lat, lng: SenderLocation.lng, icon : './assets/images/macriders/marker.png', label: "origin",},
        {lat: ReceiverLocation.lat, lng: ReceiverLocation.lng, icon : './assets/images/macriders/marker.png', label: "destination",}
      ]
      this.origin = SenderLocation;
      this.destination = ReceiverLocation;
      this.distance = this.calculateDistance(this.origin, this.destination)
      localStorage.setItem('distance', JSON.stringify(this.distance));
      for(let i = 0; i< this.itemList.length; i++){
        this.itemList[i].distance = this.distance;
      }
  }

  public renderOptions = {
    suppressMarkers: true,
}

public markerOptions = {
    origin: {
        icon: './assets/images/macriders/round-pointer.png',
    },
    destination: {
        icon: './assets/images/macriders/marker.png',
    },
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

  getAddress() {
    let SenderLocation = JSON.parse(localStorage.getItem('senderlocation'));
    let ReceiverLocation = JSON.parse(localStorage.getItem('receiverlocation'));
    var iconBase = 'src/assets/images/macriders';

    var icons = {
      dropoff: {
        icon: iconBase + 'm2.png'
      },
      pickup: {
        icon: iconBase + 'm2.png'
      }
    }

    let locations  = [
      {lat: SenderLocation.lat, lng: SenderLocation.lng, icon: iconBase + 'm2.png'},
      {lat: ReceiverLocation.lat, lng: ReceiverLocation.lng, icon: iconBase + 'm2.png'}
    ]

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: { lat: this.latitude, lng: this.longitude },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
    );

    let infoWindow = new google.maps.InfoWindow({});
    let marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
        map,
        icon: locations[i].icon
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(locations[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));
      

    // this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    //   console.log(results);
    //   console.log(status);
    //   if (status === 'OK') {
    //     if (results[0]) {
    //       this.zoom = 8;
    //       this.address = results[0].formatted_address;
    //     } else {
    //       window.alert('No results found');
    //     }
    //   } else {
    //     window.alert('Geocoder failed due to: ' + status);
    //   }

    // });
  }
}

calculateDistance(point1, point2) {
  const p1 = new google.maps.LatLng(
  point1.lat,
  point1.lng
  );
  const p2 = new google.maps.LatLng(
  point2.lat,
  point2.lng
  );
  return (
  google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000
  ).toFixed(2);
}

  initializeForm() {
    this.formData = this.form.group({
      pickUpItems: ['', [Validators.required]],
      deliveryTpe: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
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


  async notAvailableModal() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Not available at the moment',
      buttons: ['OK']
    });
  
    await alert.present();
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

async notAvailable(){
  console.log('I got here');
  const modal = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'This service is not available at the moment',
    buttons: ['OK']
  });
 return await modal.present();
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

serviceNotAvailable(){
  alert('Service not available');
}


get f() { return this.formData.controls; }

public onSubmit() : void {
  debugger;
 // console.table(this.formData.value);
  this.submitted = true;
  if(this.formData.invalid){
    return;
  }
  localStorage.setItem('deliveryObj', JSON.stringify(this.itemList));
  this.orderProduct();
  // this.formData.patchValue({
  //   pickUpItems: '',
  //   deliveryTpe: '',
  //   deliveryTime: '',  
  //   pickUpPhone: '',
  //   carriers:'',
  //   deliveryId:'',
  //   dropOffPhone: '',
  //   imageUrl: '',
  //   // scheduledDeliveryDate : [''],
  //   baseLocation : '',
  //   targetLocation : ''
  // });
  this.formData.reset();
  this.ngOnInit();
  // let data = {
  //   email: this.user.email,
  //   deliveryItems : this.itemList
  // }
 
  // this.loading.showLoader();
  // this.authService.createdelivery(data).subscribe((res : any) => {
  //   if(res.isSuccessful === true ){
  //     let returnObj = {
  //       deliveryNo: res.returnedObject.deliveryNo,
  //       totalAmount : res.returnedObject.totalAmount,
  //       transactionId : res.returnedObject.transactionId,
  //       id : res.returnedObject.id
  //     }
  //     localStorage.setItem('deliveryReturnedObj', JSON.stringify(returnObj));
  //     this.loading.closeLoader();
  //     this.orderProduct();
  //   }
  // })
}

}
