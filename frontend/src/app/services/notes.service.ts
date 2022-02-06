import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { NotesModel } from '../models/notes.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotesService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient, private userService: UserService) {}
  notes: NotesModel[] = [
    // {
    //   name: 'String',
    //   description: 'Strings are defined as an array of characters.',
    //   email: 'rohithshetty267@gmail.com',
    // },
    // {
    //   name: 'Tree',
    //   description:
    //     'A tree data structure is a non-linear data structure because it does not store in a sequential manner. It is a hierarchical structure as elements in a Tree are arranged in multiple levels. In the Tree data structure, the topmost node is known as a root node. Each node contains some data, and data can be of any type.',
    //   email: 'rohithshetty267@gmail.com',
    // },
  ];

  createNotes(note: any) {
    return this.http.post(this.backendUrl + 'notes/', note, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  fetchNotes() {
    return this.http.get<NotesModel[]>(
      this.backendUrl + 'users/get-notes/' + this.userService.getUserName(),
      {
        headers: {
          authorization: 'Bearer ' + this.userService.getToken(),
        },
      }
    );
  }

  fetchNotesById(id: any) {
    return this.http.get<NotesModel>(this.backendUrl + 'notes/' + id, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  fetchNotesByName(name: any) {
    return this.http.get<NotesModel>(
      this.backendUrl + 'notes/getNoteByName/' + name,
      {
        headers: {
          authorization: 'Bearer ' + this.userService.getToken(),
        },
      }
    );
  }

  deleteNotes(id: string) {
    return this.http.delete(this.backendUrl + 'notes/' + id, {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  editNotes(changedNotes: NotesModel) {
    return this.http.patch(
      this.backendUrl + 'notes/' + changedNotes._id,
      changedNotes,
      {
        headers: {
          authorization: 'Bearer ' + this.userService.getToken(),
        },
      }
    );
  }

  getAllNotes() {
    return this.http.get<NotesModel[]>(this.backendUrl + 'notes/', {
      headers: {
        authorization: 'Bearer ' + this.userService.getToken(),
      },
    });
  }

  getNumberOfNotes() {
    return this.notes.length;
  }
}
