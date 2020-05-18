import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from 'app/login/login.component';
import {AboutUsComponent} from '../../about-us/about-us.component';
import { CalendarComponent } from 'app/calendar/calendar.component';

export const AdminLayoutRoutes: Routes = [
    
        {path: 'dashboard',component: DashboardComponent},
        {path: 'my-plans',component: UserProfileComponent},
        {path: 'dashboard',component: DashboardComponent},
    {path:'calendar',component:CalendarComponent},
    { path: 'my-plans',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {path: 'about-us',        component: AboutUsComponent},

    { path: '**',      component: DashboardComponent },

];
























    //  {path: 'app',children: [ {path: 'userprofile',component: UserProfileComponent}]},
    //   {path: 'app',children: [ {path: 'icons',component: IconsComponent}]},
    //    {path: 'app',children: [ {path: 'notifications',component: NotificationsComponent}]}, 
    //    {path: 'app',children: [ {path: 'maps', component: MapsComponent
    //     }]
    // }, {
    //     path: 'app',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: 'app',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // },

    // { path: 'dashboard',      component: DashboardComponent },