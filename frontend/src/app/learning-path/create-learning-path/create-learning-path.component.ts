import { UserService } from './../../services/user.service';
import { LearningPathService } from '../../services/learning-path.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-learning-path',
  templateUrl: './create-learning-path.component.html',
  styleUrls: ['./create-learning-path.component.css'],
})
export class CreateLearningPathComponent implements OnInit {
  topicModal: boolean = false;
  name: string = '';
  category: string = '';
  type: string = 'private';
  topicName: string = '';
  topicDes: string = '';
  resourceLink: string = '';
  assessmentLink: string = '';
  resources: string[] = [];
  assessments: string[] = [];
  topics: {
    topicName: string;
    topicDes: string;
    resources: string[];
    assessments: string[];
  }[] = [];
  constructor(
    private learningPathService: LearningPathService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  addResource() {
    this.resources.push(this.resourceLink);
    this.resourceLink = '';
  }

  addAssessment() {
    this.assessments.push(this.assessmentLink);
    this.assessmentLink = '';
  }

  addTopic() {
    this.topics.push({
      topicName: this.topicName,
      topicDes: this.topicDes,
      resources: this.resources,
      assessments: this.assessments,
    });
    this.topicName = '';
    this.topicDes = '';
    this.resources = [];
    this.assessments = [];
  }

  addLearningPath() {
    this.learningPathService.createLearningPath({
      name: this.name,
      category: this.category,
      type: this.type,
      topics: this.topics,
      userId: this.userService.getUserId(),
    }).subscribe();
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.topics = [];
    this.name = '';
    this.category = '';
    this.type = 'private';
  }
}
