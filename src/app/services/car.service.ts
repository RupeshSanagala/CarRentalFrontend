import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../admin/car-management/car-management.component';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:5217/api/Car';

  constructor(private http: HttpClient) {}

  // Fetch all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Fetch a single car by ID
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  // Add a new car
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // Update an existing car
  updateCar(id: number, car: Car): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, car);
  }

  // Delete a car
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Fetch available cars
  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/available`);
  }

  // Fetch rented cars
  getBookedCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/booked`);
  }
}
