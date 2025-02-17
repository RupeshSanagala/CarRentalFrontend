import { ContactAdminComponent } from './admin/contact-admin/contact-admin.component';


import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersignupComponent } from './user/usersignup/usersignup.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DisplayCarsComponent } from './user/display-cars/display-cars.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { MyBookingsComponent } from './user/mybookings/mybookings.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CarManagementComponent } from './admin/car-management/car-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { BookingManagementComponent } from './admin/booking-management/booking-management.component';

import { HomeCompComponent } from './components/home-comp/home-comp.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signup', component: UsersignupComponent },
  { path: 'login', component: UserLoginComponent },
  { 
    path: 'dashboard', 
    component: UserDashboardComponent, 
    children: [
      
      
      { path: 'home', component: HomeCompComponent },  
      { path: 'about', component: AboutComponent }, 
      { path: 'contact', component: ContactComponent },
      { path: 'cars', component: DisplayCarsComponent, canActivate: [AuthGuard] },  
      { path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard] }, 
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  

  // ✅ Admin Routes (Parent-Child Structure)
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'cars', component: CarManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'bookings', component: BookingManagementComponent },
      { path:'notifications',component:ContactAdminComponent},
      { path: '', redirectTo: 'cars', pathMatch: 'full' } 
    ]
  },

  // ✅ User Routes (Parent-Child Structure)
  // { 
  //   path: 'user', 
  //   component: UserDashboardComponent, 
  //   canActivate: [AuthGuard],
  //   children: [
     
  //     { path: 'cars', component: DisplayCarsComponent },  
  //     { path: 'my-bookings', component: MyBookingsComponent }, 
  //     { path: 'profile', component: UserProfileComponent },  
  //     { path: '', redirectTo: 'home', pathMatch: 'full' } 
  //   ]
  // },

  // ✅ Wildcard Route - Redirect unknown paths to login
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


