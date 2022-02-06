import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-hero',
  templateUrl: './admin-hero.component.html',
  styleUrls: ['./admin-hero.component.css'],
})
export class AdminHeroComponent implements OnInit {
  @Input() title: string;
  @Input() childTitle: string;
  constructor() {}

  ngOnInit(): void {}
}
