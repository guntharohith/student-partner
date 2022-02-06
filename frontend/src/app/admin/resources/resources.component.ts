import { ResourceService } from './../../services/resources.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent implements OnInit {
  displayedColumns = [
    'name',
    'description',
    'link',
    'review',
    'rating',
    'action',
  ];
  displayDeleteModal: boolean = false;

  resourceData = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private resourceService: ResourceService) {}

  ngOnInit() {
    this.resourceService.getAllResources().subscribe({
      next: (res) => (this.resourceData.data = res),
      error: (err) => console.log(err),
    });
  }

  ngAfterViewInit(): void {
    this.resourceData.sort = this.sort;
    this.resourceData.paginator = this.paginator;
  }

  doFilter = (value: string) => {
    this.resourceData.filter = value.trim().toLocaleLowerCase();
  };

  removeResource(id: string) {
    this.resourceService.deleteResource(id).subscribe({
      next: (res) => {
        this.resourceData.data = this.resourceData.data.filter(
          (r: any) => r._id !== id
        );
        this.displayDeleteModal = true;
        setTimeout(() => {
          this.displayDeleteModal = false;
        }, 700);
      },
      error: (err) => console.log(err),
    });
    this.resourceService.getAllResources().subscribe({
      next: (res) => (this.resourceData.data = res),
      error: (err) => console.log(err),
    });
  }
}
