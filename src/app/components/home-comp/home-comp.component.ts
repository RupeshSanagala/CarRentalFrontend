import { Router,RouterModule } from '@angular/router';

import { AboutComponent } from './../about/about.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home-comp.component.html',
  styleUrl: './home-comp.component.css'
})
export class HomeCompComponent {


  // banner:string='./assets/banner-image.jpg';

  services1:string='./assets/facts_bg.jpg';
  services2:string='./assets/affordable car rentals.jpg';
  service3:string='./assets/customer support.png';

  bestseller1:string='./assets/best seller baleno_8.jpg';
  bestseller2:string='./assets/best seller4.jpg';
  bestseller3:string='./assets/best seller6.jpg';
}