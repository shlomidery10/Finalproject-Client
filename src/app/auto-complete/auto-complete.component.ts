import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'app/get-location.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  constructor(private getLocationService:GetLocationService) { 
 
  }
  keyword = 'name';
 data:Array<string>=[];
 
 
  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
  this.getLocationService.getAutoComplete(val).subscribe((res:Array<string>)=>{
    this.data=res;
  });
  
    
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }

  ngOnInit() {
  }

}
