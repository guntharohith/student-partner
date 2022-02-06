import { NotesModel } from './../models/notes.model';
import { NotesService } from '../services/notes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  editToggle: boolean = false;
  displayDeleteModal: boolean = false;
  displayedColumns = ['name', 'description', 'action'];
  selectedNotes: NotesModel;
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.fetchNotes().subscribe(
      {
        next : res => this.dataSource.data = res
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  removeNotes(id:string) {
    this.notesService.deleteNotes(id).subscribe(
      {
        next: res => {
          this.dataSource.data = this.dataSource.data.filter((d: any) => d._id !== id);
          this.displayDeleteModal = true;
          setTimeout(() => {
            this.displayDeleteModal = false;
          }, 700);
        }
      }
    );
  }

  editNotes() {
    this.notesService.editNotes(this.selectedNotes).subscribe();
    this.editToggle = false;
  }

}
