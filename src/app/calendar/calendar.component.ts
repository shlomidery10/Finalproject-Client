import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, startOfToday,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { GetLocationService } from 'app/get-location.service';
import {element} from 'protractor';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  arrayOfLocation:Array<any>;
  arrayOfGooglePlaces:Array<any>;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  i = 0;
  j = 10;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  today: Date = startOfToday();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(this.today), 0),
      end: addHours(this.today, 0),
      title: 'Start my trip',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,private activeRoute:ActivatedRoute,private getLocationService:GetLocationService) {
    this.arrayOfLocation = new Array<any>();
    this.arrayOfGooglePlaces = new Array<any>();
  }
  ngOnInit(): void {



    console.log("sdssd",this.activeRoute.snapshot.paramMap.get('tripName'));

    this.getLocationService.getUserTrips().subscribe((res:Array<any>)=>{
      let arrayOfPlaces:Array<any>=res['Places'];
      arrayOfPlaces.forEach(arr => {
        if (arr[0].name==this.activeRoute.snapshot.paramMap.get('tripName')) {
          this.arrayOfLocation=arr[0]['arr'];
        }

      });

      console.log(this.arrayOfLocation);
      let arrayTocheck:Array<any>;
      arrayTocheck=new Array<any>();
      this.arrayOfLocation.forEach(element => {
        this.getLocationService.getPlaceDetails(element['place_id']).subscribe(res => {
          arrayTocheck.push(res);
          console.log(res['result'].name);
          this.addEvent(res['result'].name, this.j, this.j + 2, this.today);
          this.i = this.i + 1;
          this.j = this.j + 2;
          if (this.i > 4) {
            this.i = 0;
            this.today = addDays(this.today, 1);
            this.j = 10;
            console.log(this.today);
            this.refresh.next();
          }
        })
      });

      console.log(this.events);

      this.arrayOfGooglePlaces = arrayTocheck;




    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(title: string, start: any, end: any, day: any): void {
    this.events = [
      ...this.events,
      {
        start: addHours(startOfDay(day), start),
        end: addHours(day, end),
        title: title,
        color: colors.blue,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}