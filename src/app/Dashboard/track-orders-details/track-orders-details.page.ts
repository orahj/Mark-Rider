import { Component, OnInit, ViewChild, ElementRef, NgZone, ComponentFactoryResolver } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import LocationPicker from "location-picker";
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-track-orders-details',
  templateUrl: './track-orders-details.page.html',
  styleUrls: ['./track-orders-details.page.scss'],
})
export class TrackOrdersDetailsPage implements OnInit {
  trackingdetails:any[] = JSON.parse(localStorage.getItem('trackorderdetails'));
  mapdetails = this.trackingdetails;
  phoneNumber = this.mapdetails[0].dropOffPhone;
  latitude: number;
  longitude: number;
  zoom: number;
  iconUrl = '../../../assets/images/mac-logo.png';
  loacation : {
    lat : 0,
    lng : 0
  }
  senderLocation : [];
  receiverLocation : [];
  location;

  locations : Array<object>;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modal : ModalController
  ) { }

  public markers = new BehaviorSubject<any[]>(null);

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
}
  ngOnInit() {
  
    this.modal.dismiss();
    // this.setCurrentLocation();
    // this.getLocationDetails();
    // this.getAddress();
    console.log('Tracking Details',this.trackingdetails);

    this.location = {
      latitude: this.trackingdetails[0].deliveryLocation.xLatitude,
      longitude: this.trackingdetails[0].deliveryLocation.xLogitude,
  }

  this.zoom = 8;

    this.locations = [
      {lat: this.trackingdetails[0].deliveryLocation.xLatitude, lng: this.trackingdetails[0].deliveryLocation.xLogitude, label: "origin",},
      {lat: this.trackingdetails[0].deliveryLocation.yLatitude, lng: this.trackingdetails[0].deliveryLocation.yLogitude, label: "destination",}
    ]
    // if(this.trackingdetails !== undefined){
    //   this.locations = [
    //     {lat: this.trackingdetails.deliveryLocation.xLatitude, lng: this.trackingdetails.deliveryLocation.xLogitude},
    //     {lat: this.trackingdetails.deliveryLocation.yLatitude, lng: this.trackingdetails.deliveryLocation.yLogitude}
    //   ]
    // }
  }

  ionViewDidEnter() {
    this.modal.dismiss();
  } 

  getLocationDetails(){
    console.log('I am here',this.trackingdetails);

    let infoWindow = new google.maps.InfoWindow({});
    let marker, i;


    
    if(this.trackingdetails !== undefined) {
      this.locations =[
            {lat: this.trackingdetails[0].deliveryLocation.xLatitude, lng: this.trackingdetails[0].deliveryLocation.xLogitude},
            {lat: this.trackingdetails[0].deliveryLocation.yLatitude, lng: this.trackingdetails[0].deliveryLocation.yLogitude}
          ]
      console.log('Details',this.trackingdetails[0].deliveryLocation)
      console.log('Locations',this.locations);
    }

    for (i = 0; i < this.locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.trackingdetails[0].deliveryLocation.xLatitude, this.trackingdetails[0].deliveryLocation.xLogitude),
        // map,
        // icon: this.locations[i].icon
      });

  }
}

  getAddress() {

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
      {lat: this.trackingdetails[0].deliveryLocation.xLatitude, lng: this.trackingdetails[0].deliveryLocation.xLogitude + 'm2.png'},
      {lat: this.trackingdetails[0].deliveryLocation.yLatitude, lng: this.trackingdetails[0].deliveryLocation.yLogitude, icon: iconBase + 'm2.png'}
    ]

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: { lat: this.latitude, lng: this.longitude },
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
}
