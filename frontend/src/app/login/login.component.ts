import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  toggle: boolean = false;
  submitted = false;
  forgotPasswordSubmitted = false;
  displayLoginModal = false;
  displayEmailModal = false;
  errMessage = '';
  resetPasswordErrMessage: '';
  modal: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get forgotPasswordFormControl() {
    return this.forgotPasswordForm.controls;
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userService.userLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.errMessage = ''
          this.displayLoginModal = true;
          setTimeout(() => {
            this.displayLoginModal = false;
            sessionStorage.setItem('user', JSON.stringify(res));
            if (this.userService.getRole() === 'user') {
              this.router.navigate(['/']);
            } else if (this.userService.getRole() === 'admin') {
              this.router.navigate(['/admin']);
            }
          }, 700);
        },
        error: (err) => (this.errMessage = err.error.text),
      });
    }
  }

  onResetPassword() {
    this.forgotPasswordSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      this.userService
        .resetPasswordMail(this.forgotPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.forgotPasswordForm.reset();
            this.forgotPasswordSubmitted = false;
            this.modal = false;
            this.displayEmailModal = true;
            setTimeout(() => {
              this.displayEmailModal = false;
            }, 700);
          },
          error: (err) => (this.resetPasswordErrMessage = err.error.text),
        });
    }
  }
}
