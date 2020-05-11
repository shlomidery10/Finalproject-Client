import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'app/get-location.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  latitude=32.0853;
  longitude=34.7818;
  locations:Array<any>=null;
  places:Array<any>;
  displayMap:boolean=false;
  constructor(private getLocationService:GetLocationService) { }

  ngOnInit()
   {
    this.getLocationService.getUserTrips().subscribe((res:Array<any>)=>{
      console.log("res",res);
      
    this.places=res['Places'];

    
    });
  }
  travelMap(travel:any)
  {
    this.displayMap=true;
    console.log(travel);
    this.locations=travel[0].arr;
    console.log(this.locations);
    
  }

}
