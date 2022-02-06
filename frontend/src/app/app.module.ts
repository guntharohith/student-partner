import { ResourceService } from './services/resources.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LearningPathService } from './services/learning-path.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { CreateLearningPathComponent } from './learning-path/create-learning-path/create-learning-path.component';
import { SingleLearningPathComponent } from './learning-path/single-learning-path/single-learning-path.component';
import { HomeComponent } from './home/home.component';
import { ResourcesComponent } from './resources/resources.component';
import { NotesComponent } from './notes/notes.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuardService } from './services/admin-guard.service';
import { HeroComponent } from './hero/hero.component';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LearningPathComponent,
    CreateLearningPathComponent,
    SingleLearningPathComponent,
    HomeComponent,
    ResourcesComponent,
    NotesComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HeroComponent,
    ResetPasswordComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [LearningPathService,AuthGuardService,AdminGuardService, UserService,ResourceService,NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
