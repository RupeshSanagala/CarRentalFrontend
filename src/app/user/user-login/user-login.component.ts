import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';
  invalidLogin: boolean = false;

  loginBg:string='./assets/banner.jpg';
  

 
  constructor(private authService: AuthService, private router: Router) {
    // ✅ Move background styling inside the constructor block
    document.body.style.backgroundImage = `url('${this.loginBg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  login() {
    this.authService.loginUser({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        if (response && response.token) {
          // Store token and user details
          this.authService.saveUserData(response.token, response.role, response.username, response.userId);

          // ✅ Redirect based on Role
          if (response.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        } else {
          this.triggerInvalidLogin();
        }
      },
      (error: any) => {
        this.triggerInvalidLogin();
        console.error('Login Error:', error);
      }
    );
  }

  
  triggerInvalidLogin() {
    this.invalidLogin = true;
    setTimeout(() => {
      this.invalidLogin = false; // Remove shake effect after a short time
    }, 500);
  }
}
