// import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Booking {
  id?: number;
  user_ID: number;
  userName:string;
  car_ID: number;
  carDetails:string;
  bookingDate: string;
  pickupDate: string;
  returnDate: string;
  totalPrice:string;
  status?: string; // "Confirmed", "Cancelled", "Pending"
}

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  minDate: string = '';
  returnMinDate: string = '';

  // ✅ New booking structure
  newBooking: Booking = {
    user_ID: 0,
    userName:'',
    car_ID: 0,
    carDetails:'',
    bookingDate: '',
    pickupDate: '',
    returnDate: '',
    totalPrice:'',
    
  };

  constructor(private userService: UserService
) {
  this.setMinDate();
} // ✅ Correct
 

  setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  updateReturnMinDate() {
    if (this.newBooking.pickupDate) {
      this.returnMinDate = this.newBooking.pickupDate;

      // Ensure return date is not before the pickup date
      if (this.newBooking.returnDate && this.newBooking.returnDate < this.returnMinDate) {
        this.newBooking.returnDate = this.returnMinDate;
      }
    } else {
      this.returnMinDate = this.minDate; // Reset to today if pickup date is cleared
    }
  }

  ngOnInit(): void {
    this.loadBookings();
  }



  // ✅ Fetch all bookings
  loadBookings(): void {
    this.userService.getBookings().subscribe({
      next: (bookings) => this.bookings = bookings,
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  editBooking(booking: Booking): void {
    this.selectedBooking = { ...booking };
  
    // Ensure pickupDate and returnDate validation when editing
    if (this.selectedBooking.pickupDate) {
      this.returnMinDate = this.selectedBooking.pickupDate;
    }
  }
  
  updateBooking(): void {
    if (this.selectedBooking) {
      // Confirm update
      if (!window.confirm("Are you sure you want to update this booking?")) {
        return;
      }
  
      // Ensure return date is valid before updating
      if (this.selectedBooking.returnDate < this.selectedBooking.pickupDate) {
        alert("Return date cannot be before pickup date!");
        return;
      }
  
      this.userService.updateBooking(this.selectedBooking.id!, this.selectedBooking).subscribe(() => {
        this.loadBookings();
        this.selectedBooking = null;
        alert("Booking updated successfully!");
      });
    }
  }
  
  addBooking(): void {
    if (!window.confirm("Are you sure you want to add this booking?")) {
      return;
    }
  
    this.userService.addBooking(this.newBooking).subscribe({
      next: () => {
        this.loadBookings();
        this.newBooking = { 
          user_ID: 0, userName: '', car_ID: 0, carDetails: '', 
          bookingDate: '', pickupDate: '', returnDate: '', totalPrice: '', status: 'Pending' 
        };
        alert("Booking added successfully!");
      },
      error: (err) => {
        console.error('Error adding booking:', err);
        alert('Failed to add booking.');
      }
    });
  }
  
  deleteBooking(id: number): void {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }
  
    this.userService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
      alert("Booking deleted successfully!");
    });
  }

  resetForm(): void {
    this.newBooking = {
      user_ID: 0,
      userName: '',
      car_ID: 0,
      carDetails: '',
      bookingDate: '',
      pickupDate: '',
      returnDate: '',
      totalPrice: '',
      status: 'Pending'
    };
  }
  
}
