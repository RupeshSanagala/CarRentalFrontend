// import { UserService } from './../../services/user.service';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { Component, Inject } from '@angular/core';
// import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';

// @Component({
//   selector: 'app-booking-form',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,  // ✅ Add this
//     MatInputModule,      // ✅ Add this
//     MatButtonModule,
//     ReactiveFormsModule
//   ],
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css'],
// })
// export class BookingFormComponent {
//   bookingForm: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<BookingFormComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private userService: UserService // Inject UserService
//   ) {
//     this.bookingForm = new FormGroup({
//       pickupDate: new FormControl('', Validators.required),
//       returnDate: new FormControl('', Validators.required),
//       car_ID: new FormControl(data.car_ID, Validators.required)
//     });
//   }

//   submitBooking() {
//     if (this.bookingForm.valid) {
//       const bookingData = this.bookingForm.getRawValue(); // ✅ Includes disabled fields
  
//       // Call the createBooking method from UserService
//       this.userService.createBooking(bookingData).subscribe(
//         (response) => {
//           console.log('Booking Successful:', response);
//           alert('Booking Confirmed Successfully! ✅');
//           this.dialogRef.close(response); // Close the dialog with response data
//         },
//         (error) => {
//           console.error('Booking Error:', error);
//           console.log(this.bookingForm)
//           alert('Failed to book. Please try again later. ❌');
//         }
//       );
//     }
//   }
  

//   closeDialog() {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors,ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booking-form',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  minPickupDate: string = this.getCurrentDate();

  constructor(
    public dialogRef: MatDialogRef<BookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    console.log('Received Booking Data:', this.data); // Debugging
    this.bookingForm = new FormGroup({
      car_ID: new FormControl(data.car_ID, Validators.required),
      pickupDate: new FormControl('', Validators.required),
      returnDate: new FormControl('', Validators.required)
    }, { validators: this.dateValidator });
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pickupDate = new Date(control.get('pickupDate')?.value);
      const returnDate = new Date(control.get('returnDate')?.value);

      if (!pickupDate || !returnDate) return null; 
      return returnDate > pickupDate ? null : { dateInvalid: true };
    };
  }
   
  // submitBooking() {
  //   if (this.bookingForm.valid) {
  //     const userId = localStorage.getItem('userId') // ✅ Get logged-in user ID
  //     const bookingData = this.bookingForm.getRawValue();
  
  //     console.log('Submitting Booking:', bookingData);
  
  //     this.userService.createBooking(userId, bookingData).subscribe(
  //       (response) => {
  //         console.log('Booking Successful:', response);
  //         alert('Booking Confirmed Successfully!');
  //         this.dialogRef.close(response);
  //       },
  //       (error) => {
  //         console.error('Booking Error:', error);
  //         alert('Failed to book. Please try again.');
  //       }
  //     );
  //   }
  // }
  

  submitBooking() {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;
  
      this.userService.createBooking(bookingData).subscribe(
        (response) => {
          alert('Booking Confirmed Successfully! ✅');
          this.dialogRef.close(response);
        },
        (error) => {
          alert('Failed to book. Please try again later. ❌');
        }
      );
    } else {
      alert("Please ensure all fields are filled correctly.");
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
