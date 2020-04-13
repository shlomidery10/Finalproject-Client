import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { GetLocationService } from 'app/get-location.service';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss']
})
export class TravelFormComponent implements OnInit {
  activitiesForm = new FormControl();
  activities: string[] = ['Culture', 'Outdoors', 'Relaxing', 'Beaches', 'Historic Sites','Museums','Shopping','Wildlife'];
  from: NgbDateStruct;
  To: NgbDateStruct;

  date: {year: number, month: number};
  keyword = 'name';
  data:Array<string>=[];
  placeName:string;
  days:number;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  constructor(private calendar: NgbCalendar,private getLocationService:GetLocationService,private route:Router) { 

    this.currentUrl = this.route.url;
    route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  CountDays()
  {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate:any = new Date(this.from.year, this.from.month, this.from.day);
    const secondDate:any = new Date(this.To.year, this.To.month,this.To.day);
    const differenceMs = Math.abs(firstDate - secondDate);
    this.days= Math.round(differenceMs / oneDay);
    

    // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  }
  public getPreviousUrl(){
    return this.previousUrl;
  }    

  selectTodayfrom () {
    console.log(this.from);
    
    this.from = this.calendar.getToday();
  }

  selectTodayTo() {
    this.To = this.calendar.getToday();
   this.CountDays();
  }

  ngOnInit() {
  }
  planTrip()
  {
    if (this.activitiesForm['_pendingValue'].length<3) {
      alert("must choose at least 3 activities")
    }
    if (!(this.placeName)) {
      alert("must choose at placeName")

    }
    else{
    console.log(this.activitiesForm['_pendingValue']);
   
    this.CountDays();
    console.log(this.route.url);
    console.log("previoues",this.getPreviousUrl());
    
    this.route.navigate(["/trip/",`${this.days} days in ${this.placeName}`,{activities: this.activitiesForm['_pendingValue'],days:this.days}])
    }
  }

  onChangeSearch(val: string) {
    this.placeName=val;
    console.log(val);
    
    this.getLocationService.getAutoComplete(val).subscribe((res:Array<string>)=>{
      this.data=res;
    });
   
}

onFocused($event)
{
  console.log($event);
  
}
selectEvent($event)
{
  this.placeName=$event;

  console.log($event);
  console.log("selectEvent");

}
}
