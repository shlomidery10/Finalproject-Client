import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'app/get-location.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private getLocationService:GetLocationService) { }

  ngOnInit() {
    this.getLocationService.getRecomendedTrip().subscribe(res=>{
      console.log(res);
      
    })

  }

}
