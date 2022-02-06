import { LPModel } from './../../models/learning-path.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LearningPathService } from 'src/app/services/learning-path.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class LearningPathComponent implements OnInit {
  displayedColumns = ['name', 'category', 'action'];
  topicColumns = ['topicName', 'topicDes'];
  displayDeleteModal: boolean = false;
  lpData = new MatTableDataSource();
  expandedElement: LPModel | null;
  expandedTopic: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private learningPathService: LearningPathService) {}

  ngOnInit() {
    this.learningPathService.getAllLearningPaths().subscribe({
      next: (res) => (this.lpData.data = res),
      error: (err) => console.log(err),
    });
  }

  ngAfterViewInit(): void {
    this.lpData.sort = this.sort;
    this.lpData.paginator = this.paginator;
  }

  doFilter = (value: string) => {
    this.lpData.filter = value.trim().toLocaleLowerCase();
  };

  removelp(id: string) {
    this.learningPathService.deleteLearningPath(id).subscribe({
      next: res => {
            this.lpData.data = this.lpData.data.filter(
              (lp: any) => lp._id !== id
            );

        this.displayDeleteModal = true;
        setTimeout(() => {
          this.displayDeleteModal = false;
        }, 700);
      }
    });
  }


 
}
