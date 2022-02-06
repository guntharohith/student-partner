import { ProfileComponent } from './../profile/profile.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ResourcesComponent } from './resources/resources.component';
import { LearningPathComponent } from './learning-path/learning-path.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'resources',
    component: ResourcesComponent,
  },
  {
    path: 'learning-paths',
    component: LearningPathComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
