import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.router.url === '/auth/login') {
        this.router.navigate(['/sales']);
        return false; // Prevent further navigation since we're redirecting
      }
      return true; // User is authenticated and not on the login page
    } else {
      return true; // User is not authenticated, allow access to the route
    }
  }

  canLoad(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/sales', { replaceUrl: true });
      return false; // Prevent loading of the route
    } else {
      return true; // Allow loading of the route
    }
  }
}
