import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {  MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  AgmCoreModule
} from '@agm/core';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { HttpClientModule } from '@angular/common/http';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { RouteComponent } from './route/route.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { ModalComponent } from './modal/modal.component';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';

@NgModule({
  imports: [
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional)
    AdminLayoutModule,
    // AgmCoreModule.forRoot({
    //   apiKey:'AIzaSyCW4b9s7kSCjsGCwOcQ3pza0AvMXgsf-V0'
    // }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    RouteComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule ,
]
  
})
export class AppModule { }
