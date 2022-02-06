import { UserModel } from './../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  updateProfileSubmitted: boolean = false;
  displayDeleteModal: boolean = false;
  selectedUser: UserModel;
  modal: boolean = false;
  displayedColumns = [
    'firstName',
    'lastName',
    'mobileNumber',
    'email',
    'action',
  ];
  updateProfileForm: FormGroup;

  userData = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.userData.data = this.userService.getAllUsers();
    this.userService.getAllUsers().subscribe({
      next: (res) => (this.userData.data = res),
      error: (err) => console.log(err),
    });
  }

  ngAfterViewInit(): void {
    this.userData.sort = this.sort;
    this.userData.paginator = this.paginator;
  }

  doFilter = (value: string) => {
    this.userData.filter = value.trim().toLocaleLowerCase();
  };

  onClickEdit(user: UserModel) {
    this.modal = true;
    this.updateProfileForm = new FormGroup({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      mobileNumber: new FormControl(user.mobileNumber, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      email: new FormControl(user.email),
    });
  }

  get updateProfileFormControl() {
    return this.updateProfileForm.controls;
  }

  editUser() {
    this.updateProfileSubmitted = true;
    if (this.updateProfileForm.valid && this.updateProfileForm.dirty) {
      this.userService.editUser(this.updateProfileForm.value).subscribe({
        error: (err) => console.log(err),
      });
      this.userService.getAllUsers().subscribe({
        next: (res) => (this.userData.data = res),
        error: (err) => console.log(err),
      });
      this.modal = false;
    }
  }

  removeUser(email: string) {
    this.userService.deleteUser(email).subscribe({
      next: (res) => {
        this.userData.data = this.userData.data.filter((u:any) => u.email !== email)
        this.displayDeleteModal = true;
        setTimeout(() => {
          this.displayDeleteModal = false;
        }, 700);
      },
      error: (err) => console.log(err),
    });
  }
}
