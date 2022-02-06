import { UserService } from '../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  @Input() title?: string;
  @Input() childTitle: string;
  constructor(private userService: UserService) { }
  
  ngOnInit(): void { }
  
  isAdmin() {
    if (this.userService.getRole() === 'admin') {
      return true;
    }
    return false;
  }
}
