import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { AuthStorageService } from '../Services/authStorage.service';
import { take, map } from 'rxjs/operators';
import { AlertService } from '../Services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
   if (this.authService.logedin()) {
     return true;
   }
   this.router.navigate(['/login']);
   return false;
  }
}