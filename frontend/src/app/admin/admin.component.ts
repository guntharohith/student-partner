import { NotesService } from './../services/notes.service';
import { ResourceService } from './../services/resources.service';
import { UserService } from './../services/user.service';
import { LearningPathService } from './../services/learning-path.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  analytics: {
    numberOfUsers: number;
    numberOfNotes: number;
    numberOfResources: number;
    numberOfLearningPaths: number;
  } = {
    numberOfUsers: 0,
    numberOfNotes: 0,
    numberOfResources: 0,
    numberOfLearningPaths: 0
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAnalytics().subscribe({
      next: (res) => {
        this.analytics = res;
      },
      error: (err) => console.log(err),
    });
  }
}
