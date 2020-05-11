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
  constructor(private getLocationService:GetLocationService) { }

  ngOnInit()
   {
    this.getLocationService.getUserTrips().subscribe((res:Array<any>)=>{
      console.log("res",res);
      
    this.locations=res;
    this.places=res['Places'];
    console.log("places",this.places);
    
    console.log(this.locations);
    console.log(this.locations['Places']);
    
    });
  }

}
