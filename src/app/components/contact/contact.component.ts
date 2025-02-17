import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Contact {
  contactId: number;
  full_Name: string;
  email: string;
  phoneNumber: string;
  message: string;
}


@Component({
  selector: 'app-contact',
  imports: [
   
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  location: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62182.77863059578!2d80.20938266766342!3d13.072314445113324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52667248cbdb69%3A0xc40ead684a8f274b!2sChennai%20Central%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1738909551715!5m2!1sen!2sin";
  private apiUrl = 'http://localhost:5217/api/Contact';
  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.contactForm = this.fb.group({
      full_Name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength')) {
      return `Minimum ${control.errors?.['minlength'].requiredLength} characters required`;
    }
    if (control?.hasError('pattern')) {
      return 'Enter a valid 10-digit mobile number';
    }
    return '';
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post(this.apiUrl, this.contactForm.value).subscribe({
        next: (response) => {
          alert('Form submitted successfully!');
          console.log('Response:', response);
          this.contactForm.reset();
        },
        error: (error) => {
          alert('Error submitting form. Please try again later.');
          console.error('Error:', error);
        }
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}

