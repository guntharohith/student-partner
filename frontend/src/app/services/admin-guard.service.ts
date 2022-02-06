import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.getUserName()) {
      if (this.userService.getRole() === 'admin') {
        return true;
      }
      if (this.userService.getRole() === 'user') {
        this.router.navigate(['/']);
        return false;
      }
    }
    this.router.navigate(['/login'])
    return false;
  }
}
