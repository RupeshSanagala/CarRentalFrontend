// import { Component, OnInit } from '@angular/core';
// import { Router,RouterModule} from '@angular/router';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   imports:[RouterModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'Car Rental App';

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.redirectUser();
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       this.router.navigate(['/home']);
//     }
//   }

//   // ✅ Redirect based on role after login
//   redirectUser() {
//     const role = this.authService.getUserRole(); 
//     if (role === 'Admin') {
//       this.router.navigate(['/admin']);  
//     } else if (role === 'User') {
//       this.router.navigate(['/home']);  
//     } else {
//       this.router.navigate(['home']);  
//     }
//   }


//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports:[RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Car Rental App';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.redirectUser();
  }

  // ✅ Redirect based on role after login
  redirectUser() {
    const role = this.authService.getUserRole(); 
    if (role === 'Admin') {
      this.router.navigate(['/admin']);  
    } else if (role === 'User') {
      this.router.navigate(['/dashboard']);  
    } else {
      this.router.navigate(['/dashboard']);  
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  } 
}







