
import { Booking } from './../admin/booking-management/booking-management.component';

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../admin/user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5217/api/User'; 
  private registerUrl='http://localhost:5217/api/auth/register';
  private bookingUrl = 'http://localhost:5217/api/Booking';
  private adminUrl = 'http://localhost:5217/api/admin/bookings';
  constructor(private http: HttpClient) {}
  //booking by admin
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.adminUrl, booking);
  }
  //booking by user
  createBooking(booking: Booking): Observable<Booking> {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!userId) {
      console.error('User ID not found in localStorage.');
      throw new Error('User ID is required for booking.');
    }

    // Append userId to API endpoint
    const url = `${this.bookingUrl}/create/${userId}`; // Dynamically create URL with userId

    return this.http.post<Booking>(url, booking);
}

// createBooking(userId: number, bookingData: any): Observable<any> {
//   const url = `http://localhost:5217/api/Booking/create/${userId}`; // ✅ Use dynamic userId
//   return this.http.post(url, bookingData);
// }



  // ✅ Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // ✅ Get user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add new user
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }

  // ✅ Update user details
  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, user);
  }

  // ✅ Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Reset user password
  // resetUserPassword(id: number, newPassword: string): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}/reset-password`, newPassword);
  // }

  // // ✅ Toggle user active/inactive status
  // toggleUserStatus(id: number, isActive: boolean): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}/status`, {});
  // }

  // ✅ Assign Role (Admin/User)
  assignRole(id: number, role: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/role`, role);
  }

  // ✅ Fetch user profile using correct API endpoint
  getUserProfile(userId: number) {
    return this.http.get(`${this.apiUrl}/id/${userId}`);
  }

  // ✅ Update user profile using correct API endpoint
  updateUserProfile(userId: number, data: any) {
    return this.http.put(`${this.apiUrl}/update/${userId}`, data);
  }

  // ✅ Get all bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingUrl);
  }

  // ✅ Get booking by ID
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.bookingUrl}/${id}`);
  }

  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.bookingUrl}/user/${userId}`);
  }
  

  // ✅ Create a new booking by fetching userId from localStorage
//   createBooking(booking: Booking): Observable<Booking> {
//     const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

//     if (!userId) {
//       console.error('User ID not found in localStorage.');
//       throw new Error('User ID is required for booking.');
//     }

//     // Append userId to API endpoint
//     const url = `${this.bookingUrl}/create/${userId}`; // Dynamically create URL with userId

//     return this.http.post<Booking>(url, booking);
// }

// createBooking(userId: string, bookingData: any) {
//   const url = `http://localhost:5217/api/Booking/create/${userId}`;
//   return this.http.post(url, bookingData);
// }


// createBooking(userId: string, bookingData: any) {
//   // Update the URL to include the userId in the path
//   const url = `http://localhost:5217/api/Booking/create/${userId}`;
  
//   // Send POST request to the backend with the booking data
//   return this.http.post<CarBookingResponseDto>(url, bookingData);
// }



// Base URL without the userId


  // ✅ Update booking
  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.bookingUrl}/${id}`, booking);
  }

  // ✅ Delete a booking
  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.bookingUrl}/${bookingId}`);
  }
  

  
}


