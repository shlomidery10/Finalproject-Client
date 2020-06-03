import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'app/get-location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  Days: string[] = ['17', '18', '19', '20', '21', '22', '23'];
  latitude = 32.0853;
  longitude = 34.7818;
  locations: Array<any> = null;
  places: Array<any>;
  displayMap = false;
  origin: any;
  destination: any;
  icon: string;
  distanceArray: Array<any>;
  locationToDisplay: Array<any>;
  travelName: string;
  travelId: string;
  public renderOptions = {
    suppressMarkers: true,
}
public markerOptions = {
      icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
  // destination: {
  //     icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756626_face_512x512.png',
  //     label: 'MARKER LABEL',
  //     opacity: 0.8,
  // },
}
  constructor(private getLocationService: GetLocationService, private route: Router) {
    this.locationToDisplay = new Array<any>();
    this.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|FE6256|000000'
    this.distanceArray = new Array<any>();
  }
  ngOnInit() {

//     this.origin = {
//       lat: 32.0853,
//       lng: 34.7818
//   };
//   this.destination = {
//     lat: 32.1782,
//     lng: 34.9076
// };

    this.getLocationService.getUserTrips().subscribe((res: Array<any>) => {
      console.log('res', res);
    this.places = res['Places'];
      const length = this.places.length - 1;
      console.log("shlom places!!!!!!!!,",this.places[0][0].name);
      
    this.places[length][0].arr.forEach(location => {
      this.locationToDisplay.push({lat: parseFloat(location.lat), lng: parseFloat(location.lng)});

    });
    this.locations = this.places[length][0].arr;
    this.travelName = this.places[length][0].name;
    this.latitude = this.places[length][0].arr[0].lat;
    this.longitude = this.places[length][0].arr[0].lng;

    for (let index = 0; index < this.locations.length - 1; index++) {
      this.distanceArray.push(this.calculateDistance(this.locations[index], this.locations[index + 1]))

    }
    });

  }
  recommendedTrip() {
    this.getLocationService.saveRecomendedTrip(this.locations, this.travelName).subscribe(res => {
      console.log(res);
    });
    alert("thanks");

  }
  test(check)
  {
    console.log("test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",check);
    
  }
  travelMap(travel: any) {
    this.displayMap = true;
    console.log(travel);
    this.locations = travel[0].arr;
    this.travelName = travel[0].name;
    this.latitude = travel[0].arr[0].lat;
    this.longitude = travel[0].arr[0].lng;
    console.log(travel);

    this.longitude = this.places[length][0].arr[0].lng;
    console.log(this.locationToDisplay);
    this.locationToDisplay = [];
    console.log('???????', this.locationToDisplay);



    this.locations.forEach(location => {
      this.locationToDisplay.push({lat: parseFloat(location.lat), lng: parseFloat(location.lng)});
    });

    console.log('check here', this.locationToDisplay);

    console.log('check here', this.locations);
    this.distanceArray = [];

    for (let index = 0; index < this.locations.length - 1; index++) {
      this.distanceArray.push(this.calculateDistance(this.locations[index], this.locations[index + 1]))

    }
console.log('distance', this.distanceArray);


  }

  calculateDistance(point1, point2) {
    // const p1 = new google.maps.LatLng(
    // point1.lat,
    // point1.lng
    // );
    // const p2 = new google.maps.LatLng(
    // point2.lat,
    // point2.lng
    // );
    // return (
    // google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000
    // ).toFixed(2);
}


routeToCalendar() {
  this.route.navigate(['app', 'calendar', {tripName: this.travelName}], );

}
routeToTimeLine() {
  this.route.navigate(['app', 'Days', {tripName: this.travelName}], );
}
}
