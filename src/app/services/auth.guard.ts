import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); 
    const username = localStorage.getItem('username'); 
    const userId = localStorage.getItem('userId'); 

    // console.log('AuthGuard:', { token, role, username, userId }); 

    // ✅ If no token, redirect to login
    if (!token) {
      console.log('No token found. Redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Get the requested route (handle undefined cases)
    const requestedPath = route.url.length > 0 ? route.url[0].path : '';

    // ✅ Prevent regular users from accessing admin routes
    if (role === 'User' && requestedPath === 'admin') {
      console.log('Unauthorized: User trying to access admin route.');
      this.router.navigate(['/home']); // Redirect users to home
      return false;
    }

    // ✅ Prevent admins from accessing user-specific routes
    if (role === 'Admin' && requestedPath.startsWith('user')) {
      console.log('Unauthorized: Admin trying to access user route.');
      this.router.navigate(['/admin']); // Redirect admins to admin panel
      return false;
    }

    return true;
  }
}
