import { UserService } from './../../services/user.service';
import { NotesService } from './../../services/notes.service';
import { LPModel } from '../../models/learning-path.model';
import { LearningPathService } from '../../services/learning-path.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-learning-path',
  templateUrl: './single-learning-path.component.html',
  styleUrls: ['./single-learning-path.component.css'],
})
export class SingleLearningPathComponent implements OnInit {
  modal: boolean = false;
  id: string = '';
  notesDescription: any;
  learningPath?: LPModel;
  currentTopic?: {
    topicName: string;
    topicDes: string;
    resources: string[];
    assessments: string[];
  };
  edit: boolean = false;
  note_id?: string;
  constructor(
    private route: ActivatedRoute,
    private learningPathService: LearningPathService,
    private notesService: NotesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.learningPathService.getLearningPathById(this.id).subscribe({
      next: (res) => {
        this.learningPath = res;
        this.currentTopic = res.topics[0];
        this.notesService.fetchNotesByName(res.topics[0].topicName).subscribe({
          next: (note) => {
            note
              ? ((this.notesDescription = note.description),
                (this.note_id = res._id),
                (this.edit = true))
              : (this.notesDescription = '',this.edit = false);
          },
        });
      },
      error: (err) => console.log(err),
    });
  }

  setCurrentTopic(topic: any) {
    this.currentTopic = topic;
    this.notesService.fetchNotesByName(topic.topicName).subscribe({
      next: (res) => {
        console.log(res)
        res
          ? ((this.notesDescription = res.description),
            (this.note_id = res._id),
            (this.edit = true))
          : (this.notesDescription = '',this.edit = false);
      },
    });
  }

  addNotes() {
    this.edit
      ? this.notesService
          .editNotes({
            _id: this.note_id,
            description: this.notesDescription,
          })
          .subscribe()
      : this.notesService
          .createNotes({
            name: this.currentTopic?.topicName,
            description: this.notesDescription,
            userId: this.userService.getUserId(),
          })
          .subscribe();
    this.modal = false;
  }
}
