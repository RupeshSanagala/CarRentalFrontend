import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BookingFormComponent } from './../booking-form/booking-form.component';
import { MatInputModule } from '@angular/material/input';

interface Car {
  Car_ID: number;
  brand: string;
  model: string;
  Year: number;
  PricePerDay: number;
  License_Plate: string;
  Availability_Status: string;
  Category: string;
  Location: string;
}

@Component({
  selector: 'app-display-cars',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './display-cars.component.html',
  styleUrls: ['./display-cars.component.css']
})
export class DisplayCarsComponent implements OnInit {
  cars: any[] = [];
  carsImages = [
    { image: './assets/Honda City.jpeg' },
    { image: './assets/Hyundai creta.png' },
    { image: './assets/Hyundai-i20.jpg' },
    { image: './assets/Mahindra tuv 300.jpg' },
    { image: './assets/Punch-static.jpg' },
    { image: './assets/Suzuki_Celerio.jpg' },
    { image: './assets/Tata Tiago.jpeg' },
    { image: './assets/Toyoto corrolla.jpeg' },
    { image: './assets/bolero.jpg' },
    { image: './assets/chevrolet malibu.jpeg' },
    { image: './assets/ertiga.jpeg' },
    { image: './assets/honda civic.jpg' },
    { image: './assets/innova.jpeg' },
    { image: './assets/jeep.jpg' },
    { image: './assets/kia seltos.jpg' },
    { image: './assets/mahindra morrozo.jpeg' },
    { image: './assets/mahindra xuv700.jpeg' },
    { image: './assets/mahindra-xuv300.jpg' },
    { image: './assets/mahindra_THAR.jpeg' },
    { image: './assets/maruti-suzuki-ciaz.jpg' },
    { image: './assets/nissan altima.jpg' },
    { image: './assets/tata-altroz-dark-edition.jpg' },
    { image: './assets/tata-safari.jpg' },
    { image: './assets/verna.jpg' },
    { image: './assets/volkswagen_jetta2.jpeg' }
  ];
  filteredCars: any[] = [];
  categories: string[] = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'MUV'];
locations: string[] = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 
  'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Nagpur', 'Indore', 'Patna', 
  'Bhopal', 'Vadodara', 'Ludhiana', 'Agra', 'Nashik', 'Meerut', 'Rajkot', 
  'Jamshedpur', 'Amritsar', 'Jodhpur', 'Dehradun'
];


  selectedCategory: string = '';
  selectedLocation: string = '';
  selectedPrice: number = 500; // Default price range max value

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchCarDetails();
  }

  fetchCarDetails() {
    this.http.get<any[]>('http://localhost:5217/api/Car/available')
      .subscribe(response => {
        this.cars = response.map((car, index) => ({
          ...car,
          image: this.carsImages[index % this.carsImages.length].image
        }));
        this.filteredCars = [...this.cars];
      });
  }

  getCarImage(car: Car): string {
    const matchedCar = this.carsImages.find(img => img.image.toLowerCase().includes(car.model.toLowerCase()));
    return matchedCar ? matchedCar.image : './assets/cheap cars1.jpg';
  }
  

  fetchCarsByCategory(category: string) {
    return this.http.get<any[]>(`http://localhost:5217/api/Car/category/${category}`);
  }

  fetchCarsByLocation(location: string) {
    return this.http.get<any[]>(`http://localhost:5217/api/Car/city/${location}`);
  }

  fetchCarsByPriceRange(minPrice: number, maxPrice: number) {
    return this.http.get<any[]>(`http://localhost:5217/api/Car/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  applyFilters() {
    let filtersApplied = 0; // Track applied filters

    if (this.selectedCategory) {
      filtersApplied++;
      this.fetchCarsByCategory(this.selectedCategory).subscribe(response => {
        this.filteredCars = response;
      });
    }

    if (this.selectedLocation) {
      filtersApplied++;
      this.fetchCarsByLocation(this.selectedLocation).subscribe(response => {
        this.filteredCars = response;
      });
    }

    if (this.selectedPrice) {
      filtersApplied++;
      this.fetchCarsByPriceRange(0, this.selectedPrice).subscribe(response => {
        this.filteredCars = response;
      });
    }

    if (filtersApplied === 0) {
      this.filteredCars = [...this.cars]; // Reset to all cars if no filters applied
    }
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.selectedPrice = 500; // Reset price filter to default
    this.filteredCars = [...this.cars]; // Reset to all cars
  }

  openBookingForm(car: any) {
    const dialogRef = this.dialog.open(BookingFormComponent, {
      width: '400px',
      data: { car_ID: car.Car_ID }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User booked:', result);
      }
    });
    console.log(car.car_ID)
  }



}