import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggle: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.toggle = false;
  }

  isLoggedIn() {
    if (this.userService.getUserName()) {
      return true;
    }
    return false;
  }
  isAdmin() {
    if (this.userService.getRole() === "admin") {
      return true;
    }
    return false;
  }
  isUser() {
    if (this.userService.getRole() === "user") {
      return true;
    }
    return false;
  }

}
