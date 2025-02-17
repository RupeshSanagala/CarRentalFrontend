import { UsersignupService } from './../../services/usersignup.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule} from '@angular/router';


@Component({
  selector: 'app-usersignup',
  imports:[CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UsersignupService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: () => {
          alert('Registration successful! Please login.');
          this.router.navigate(['/user/login']);
        },
        error: (error:any) => {
          this.errorMessage = error.error || 'Registration failed. Please try again.';
        }
      });
    }
  }
}

