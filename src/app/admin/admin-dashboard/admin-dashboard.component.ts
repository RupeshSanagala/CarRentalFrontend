import { AuthService } from './../../services/auth.service';
import { Router,RouterModule } from '@angular/router';
import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports:[RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminName: string = '';
  isLoggedIn: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    this.adminName = localStorage.getItem('username') || 'Admin';
  }

  logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      this.isLoggedIn = false;
      this.router.navigate(['/dashboard']);
    }
  }
}


