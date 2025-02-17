import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-mybookings',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  displayedColumns: string[] = ['carDetails', 'pickupDate', 'returnDate', 'totalPrice', 'actions'];

  constructor(private userService: UserService) {} 

  ngOnInit() {
    this.fetchUserBookings();
  }

  fetchUserBookings() {
    const userId = Number(localStorage.getItem('userId')); // Convert to number

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    this.userService.getUserBookings(userId).subscribe({
      next: (data) => this.bookings = data,
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  cancelBooking(bookingId: number) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      this.userService.deleteBooking(bookingId).subscribe({
        next: () => {
          alert("Booking canceled successfully!");
          this.fetchUserBookings(); // Refresh bookings list after cancellation
        },
        error: (err) => console.error("Error canceling booking:", err)
      });
    }
  }
}
