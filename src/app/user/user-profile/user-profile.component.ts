import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './../../services/profile.service';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  profileForm: FormGroup;
  userProfile: any;
  isEditing = false;
  successMessage = '';
  userId: number = 1; // Assuming user ID is retrieved from AuthService or token

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // ngOnInit() {
  //   this.loadUserProfile();
  // }

  // // ✅ Fetch user profile
  // loadUserProfile() {
  //   this.profileService.getUserProfile(this.userId).subscribe(
  //     (response: any) => {
  //       this.userProfile = response;
  //       this.profileForm.patchValue({
  //         username: response.username,
  //         email: response.email,
  //         phoneNumber: response.phoneNumber,
  //         address: response.address
  //       });
  //     },
  //     (error: any) => {
  //       console.error('Error loading user profile:', error);
  //     }
  //   );
  // }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.get('username')?.enable();
    this.profileForm.get('phoneNumber')?.enable();
    this.profileForm.get('address')?.enable();
  }

  // // ✅ Update user profile
  // updateProfile() {
  //   if (this.profileForm.valid) {
  //     this.profileService.updateUserProfile(this.userId, this.profileForm.value).subscribe(
  //       response => {
  //         this.successMessage = 'Profile updated successfully!';
  //         this.isEditing = false;
  //         this.loadUserProfile();  // Refresh profile after update
  //       },
  //       error => {
  //         console.error('Error updating profile:', error);
  //       }
  //     );
  //   }
  // }

  // cancelEdit() {
  //   this.isEditing = false;
  //   this.loadUserProfile();
  // }
}
