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
  locations:Array<Array<any>>=null;
  constructor(private getLocationService:GetLocationService) { }

  ngOnInit()
   {
    this.getLocationService.getUserTrips().subscribe((res:Array<Array<any>>)=>{
    this.locations=res;
    console.log(this.locations);
    
    });
  }

}
