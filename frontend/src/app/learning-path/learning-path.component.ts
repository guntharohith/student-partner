import { LPModel } from '../models/learning-path.model';
import { LearningPathService } from '../services/learning-path.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {
  learningPaths: LPModel[] = [];
  constructor(private learningPathService:LearningPathService) { }

  ngOnInit(): void {
    this.learningPathService.fetchLearningPaths().subscribe(
      {
        next: res => this.learningPaths = res,
        error: err => console.log(err)
      }
    );
  }

}
