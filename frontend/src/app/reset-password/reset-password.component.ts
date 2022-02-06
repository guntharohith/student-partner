import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatch } from '../utils/passwordMatcher';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  id: string;
  toggle: boolean = false;
  submitted: boolean = false;
  errorMsg: string = '';
  resetForm = new FormGroup(
    {
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
  get resetFormControl() {
    return this.resetForm.controls;
  }
  constructor(private route: ActivatedRoute, private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.id = this.route.snapshot.params['id'];
  }

  onResetPassword() {
    this.submitted = true;
    if (this.resetForm.valid) {
      this.userService.resetPassword({ token: this.token, userId: this.id, password: this.resetForm.value.password }).subscribe(
        {
          next : res => this.router.navigate(['/login']),
          error : err => this.errorMsg = err.error.text
        }
      )
    }
  }
}
