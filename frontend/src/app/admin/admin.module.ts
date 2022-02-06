import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { ResourcesComponent } from './resources/resources.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHeroComponent } from './admin-hero/admin-hero.component';
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    LearningPathComponent,
    ResourcesComponent,
    AdminHeroComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
