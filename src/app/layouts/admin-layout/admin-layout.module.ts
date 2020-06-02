import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  DateAdapter
} from '@angular/material';
import { AutoCompleteComponent } from 'app/auto-complete/auto-complete.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TravelFormComponent } from 'app/travel-form/travel-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { ModalComponent } from 'app/modal/modal.component';
import { CommentsModalComponent } from 'app/comments-modal/comments-modal.component';
import {AboutUsComponent} from '../../about-us/about-us.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmDirectionModule } from 'agm-direction';
import { CalendarComponent } from 'app/calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        NgxSpinnerModule,
        MatSelectModule,
        AgmDirectionModule,
        MatTooltipModule, AutocompleteLibModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCW4b9s7kSCjsGCwOcQ3pza0AvMXgsf-V0',
            libraries: ['geometry']

        }),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }), MatMenuModule, MatCheckboxModule, MatListModule, MatExpansionModule, MatCardModule,


    ],
  declarations: [
    DashboardComponent ,
    // UserProfileComponent,
    CalendarComponent,

    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AutoCompleteComponent,
    TravelFormComponent,   
    UserProfileComponent,
    ModalComponent,
    CommentsModalComponent,
      AboutUsComponent,


  ],
  exports:[NgxSpinnerModule],
  bootstrap: [TravelFormComponent,ModalComponent,CommentsModalComponent]

})

export class AdminLayoutModule {}
