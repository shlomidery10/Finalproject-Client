import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { GetLocationService } from 'app/get-location.service';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
// @ts-ignore
import moment = require('moment');
import {formatDate} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss'],
  styles: [`
    .form-group.hidden {
      width: 0;
      margin: 0;
      border: none;
      padding: 0;
    }
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class TravelFormComponent implements OnInit {
  activitiesForm = new FormControl();
  activities: string[] = ['Culture', 'Outdoors', 'Relaxing', 'Beaches', 'Historic Sites', 'Museums', 'Shopping', 'Wildlife'];
  from: NgbDateStruct;
  To: NgbDateStruct;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  date: {year: number, month: number};
  keyword = 'name';
  data: Array<string> = [];
  placeName: string;
  days: number;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  today: number = Date.now();
  isDisabled =  Date.now();
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = this.currentDate.getMonth() + 1;
  day = this.currentDate.getDate();

  // isDisabled = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  // tslint:disable-next-line:max-line-length
  constructor(private calendar: NgbCalendar, private spinner: NgxSpinnerService,public formatter: NgbDateParserFormatter , private getLocationService: GetLocationService, private route: Router) {

    // this.fromDate = calendar.getToday();
   // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.currentUrl = this.route.url;
    route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  CountDays() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: any = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    const secondDate: any = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
    const differenceMs = Math.abs(firstDate - secondDate);
    this.days = Math.round(differenceMs / oneDay);


    // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  }
  public getPreviousUrl() {
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
  planTrip() {
    if (this.activitiesForm['_pendingValue'].length < 3) {
      alert('must choose at least 3 activities')
    }
    if (!(this.placeName)) {
      alert('must choose at placeName')

    } else {
    console.log(this.activitiesForm['_pendingValue']);

    this.CountDays();
    console.log(this.route.url);
    console.log('previoues', this.getPreviousUrl());

      // tslint:disable-next-line:max-line-length
      console.log("this.spinner.show()");
      
      this.route.navigate(['/trip/', `${this.days} days in ${this.placeName}`, {activities: this.activitiesForm['_pendingValue'], days: this.days}])
      console.log("start");
      

 }
  }

  onChangeSearch(val: string) {
    this.placeName = val;
    console.log(val);

    this.getLocationService.getAutoComplete(val).subscribe((res: Array<string>) => {
      this.data = res;
    });

}

onFocused($event) {
  console.log($event);

}
selectEvent($event) {
  this.placeName = $event;

  console.log($event);
  console.log('selectEvent');

}
}