import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,private userService:UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.getUserName()) {
      if (this.userService.getRole() === 'user') {
        return true;
      }
      if (this.userService.getRole() === 'admin') {
        this.router.navigate(['/admin']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
