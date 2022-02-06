import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatch } from '../utils/passwordMatcher';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  toggle: boolean = false;
  submitted = false;
  errorMsg: string = '';
  displaySignupModal: boolean = false;
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: passwordMatch,
    }
  );

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  get signupFormControl() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.userService.addUser(this.signupForm.value).subscribe({
        next: (res) => {
          this.errorMsg = '';
          this.displaySignupModal = true;
          setTimeout(() => {
            this.displaySignupModal = false;
            this.router.navigate(['/login']);
          }, 700);
        },
        error: (err) => (this.errorMsg = err.error.text),
      });
    }
  }
}
