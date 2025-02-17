import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBookingService {
  private apiUrl = 'http://localhost:5217/api/Booking'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // ✅ Create a new booking (POST)
  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, bookingData);
  }

  // ✅ Get user bookings by userId (GET)
  getUserBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  // ✅ Update a booking by bookingId (PUT)
  updateBooking(bookingId: number, bookingData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}`, bookingData);
  }

  // ✅ Delete a booking by bookingId (DELETE)
  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookingId}`);
  }
}
