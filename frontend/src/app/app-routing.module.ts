import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { ResourcesComponent } from './resources/resources.component';
import { HomeComponent } from './home/home.component';
import { SingleLearningPathComponent } from './learning-path/single-learning-path/single-learning-path.component';
import { CreateLearningPathComponent } from './learning-path/create-learning-path/create-learning-path.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'create-learning-path',
    canActivate: [AuthGuardService],
    component: CreateLearningPathComponent,
  },
  {
    path: 'learning-paths',
    canActivate: [AuthGuardService],
    component: LearningPathComponent,
  },
  {
    path: 'learning-paths/:id',
    canActivate: [AuthGuardService],
    component: SingleLearningPathComponent,
  },
  {
    path: 'resources',
    canActivate: [AuthGuardService],
    component: ResourcesComponent,
  },
  {
    path: 'notes',
    canActivate: [AuthGuardService],
    component: NotesComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent,
  },
  {
    path: 'reset-password/:token/:id',
    component: ResetPasswordComponent
  },
  {
    path: 'admin',
    canActivate: [AdminGuardService],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
