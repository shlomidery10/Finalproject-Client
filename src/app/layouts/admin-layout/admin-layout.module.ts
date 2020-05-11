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
  MatSelectModule
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
    MatSelectModule,
    MatTooltipModule,AutocompleteLibModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCW4b9s7kSCjsGCwOcQ3pza0AvMXgsf-V0'
    }),
  ],
  declarations: [
    DashboardComponent ,
    // UserProfileComponent,
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
      AboutUsComponent

  ],
  bootstrap: [TravelFormComponent,ModalComponent,CommentsModalComponent]

})

export class AdminLayoutModule {}
