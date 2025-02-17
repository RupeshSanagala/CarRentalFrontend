import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  userId: number; 
  username: string;
  email: string;
  password?: string; 
  address: string;
  phone_Number: string; 
  role: string; 
  isActive: boolean;
  bookings?: number[]; 
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;


  newUser: User = { 
    userId: 0, 
    username: '', 
    email: '', 
    password: 'Default@123', 
    address: '', 
    phone_Number: '', 
    role: 'User', 
    isActive: true 
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ✅ Fetch all users
  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // ✅ Add a new user
  addUser(): void {
    this.userService.registerUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = { 
          userId:0,
          username: '', 
          email: '', 
          password: '', 
          address: '', 
          phone_Number: '', 
          role: 'User', 
          isActive: true 
        };
       
      },
      error: (err:any) => {
        console.log(this.newUser);
        console.error('Error adding user:', err);
        alert('Failed to add user. Check console for details.');
      }
    });
  }

  // ✅ Edit a user
  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  
  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.userId, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.selectedUser = null;
      });
    }
  }

  
  deleteUser(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmDelete) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
  

  // // ✅ Reset user password
  // resetPassword(user: User): void {
  //   const newPassword = prompt(`Enter new password for ${user.username}:`);
  //   if (newPassword) {
  //     this.userService.resetUserPassword(user.userId, newPassword).subscribe(() => {
  //       alert('Password reset successfully!');
  //     });
  //   }
  // }

  
  }

  

