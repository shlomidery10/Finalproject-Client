import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RouteComponent } from './route/route.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
      // { path: 'my-plans',   component: UserProfileComponent },

  { path: 'app',
  component: AdminLayoutComponent,
  loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'

},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'app',
  //   redirectTo: 'dashboard',
  // },

  {path: 'trip',children:[
    {path: ':travelName',    component: RouteComponent},
// { path: '',component: RouteComponent,},
// { path: '**',component: RouteComponent,}

  ]
}, 




  { path: '**', component: LoginComponent },







  ///////////////
//   {
// path:'',
// redirectTo:'app'
//   },

//   {
//     path: 'app',
//     redirectTo: 'dashboard',
//     pathMatch: 'full',
//   }, 
//   {
//     path: 'trip',children:[
//       {path: ':travelName',    component: RouteComponent},
// // { path: '',component: RouteComponent,},
// // { path: '**',component: RouteComponent,}

//     ]
//   }, 
  {
    path: 'app',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
