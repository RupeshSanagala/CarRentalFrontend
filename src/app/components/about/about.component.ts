import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
@Component({
  selector: 'app-about',
  imports: [CommonModule,RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  banner = 'assets/banner.jpg';
  img2 = 'assets/about_us_img1.jpg';

  vehicles = [
    { name: 'SUV', content: 'Spacious & comfortable', image: 'assets/trending-car-img-3.jpg' },
    { name: 'Sedan', content: 'Luxury & style', image: 'assets/skoda rapid 2021.jpg' },
    { name: 'Hatchback', content: 'Compact & efficient', image: 'assets/trending-car-img-1.jpg' },
    { name: 'Premium', content: 'Top-class performance', image: 'assets/trending-car-img-2.jpg' },
  ];

  journeyCards = [
    { title: 'Our Mission', description: 'Reliable, affordable car rental services.', image: 'assets/mission.jpg' },
    { title: 'Our Philosophy', description: 'Exceptional service with integrity.', image: 'assets/val&phil.jpg' },
    { title: 'Customer Service', description: 'Dedicated to smooth experiences.', image: 'assets/customer.jpg' },
    { title: 'Our Team', description: 'Highly committed professionals.', image: 'assets/team.jpg' }
  ];

  locations = [
    { name: 'Hyderabad', image: 'assets/hyderabad.jpg' },
    { name: 'Mumbai', image: 'assets/mumbai.jpg' },
    { name: 'Chennai', image: 'assets/chennai1.jpg' },
    { name: 'Vizag', image: 'assets/vizag.jpg' },
    { name: 'Delhi', image: 'assets/delhi.jpg' },
    { name: 'Goa', image: 'assets/goa.jpg' },
    
  ];
}
