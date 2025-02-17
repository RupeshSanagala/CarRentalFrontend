import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Car {
  car_ID?: number; // Optional for new cars
  brand: string;
  model: string;
  year: number;
  license_Plate: string;
  availability_Status: string;
  category:string;
  location:string;
  bookingIds?: number[]; // Optional for booked cars
}


@Component({
  selector: 'app-car-management',
  imports:[FormsModule,CommonModule],
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css'],
})
export class CarManagementComponent implements OnInit {
  cars: Car[] = [];
  availableCars: Car[] = [];
  bookedCars: Car[] = [];
  newCar: Car = { brand: '', model: '', year: 0, license_Plate: '', availability_Status: 'Available',category:'',location:'' };
  selectedCar: Car | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadAvailableCars();
    this.loadBookedCars();
  }

  // Load all cars
  loadCars(): void {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  // Load available cars
  loadAvailableCars(): void {
    this.carService.getAvailableCars().subscribe((data) => {
      this.availableCars = data;
    });
  }

  // Load booked cars
  loadBookedCars(): void {
    this.carService.getBookedCars().subscribe((data) => {
      this.bookedCars = data;
    });
  }

  // Add a new car
  onAddCar(): void {
    this.carService.addCar(this.newCar).subscribe((car) => {
      this.cars.push(car);
      this.newCar = { brand: '', model: '', year: 0, license_Plate: '', availability_Status: 'Available',category:'',location:'' };
      this.loadCars();
    });
  }

  // Edit car (populate form)
  onEditCar(car: Car): void {
    this.selectedCar = { ...car }; // Clone the object to avoid direct mutation
  }

  // Update car details
  onUpdateCar(): void {
    if (!this.selectedCar) return;
    this.carService.updateCar(this.selectedCar.car_ID!, this.selectedCar).subscribe(() => {
      this.selectedCar = null;
      this.loadCars();
    });
  }

  // Delete car
  onDeleteCar(carId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    
    if (confirmDelete) {
      this.carService.deleteCar(carId).subscribe(() => {
        this.cars = this.cars.filter((car) => car.car_ID !== carId);
      });
    }
  }
  

  // Cancel edit
  cancelEdit(): void {
    this.selectedCar = null;
  }
}
