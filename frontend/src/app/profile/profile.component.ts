import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  changePassSubmitted: boolean = false;
  updateProfileSubmitted: boolean = false;
  errorMessage: string = '';
  profileImage: any;
  imageFile: any;
  imageExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
  imgErrMsg: boolean = false;
  changePasswordForm = new FormGroup(
    {
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: passwordMatch,
    }
  );

  updateProfileForm: FormGroup;

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.updateProfileForm = new FormGroup({
      firstName: new FormControl(user?.firstName, Validators.required),
      lastName: new FormControl(user?.lastName, Validators.required),
      mobileNumber: new FormControl(user?.mobileNumber, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      email: new FormControl({ value: user?.email, disabled: true }),
    });
    this.profileImage = this.userService.getProfileImage()
      ? 'http://localhost:8080/' + this.userService.getProfileImage()
      : '';
  }

  get updateProfileFormControl() {
    return this.updateProfileForm.controls;
  }

  changePassword() {
    const { currentPassword, newPassword } = this.changePasswordForm.value;
    this.changePassSubmitted = true;
    if (this.changePasswordForm.valid) {
      this.userService.changePassword(currentPassword, newPassword).subscribe({
        next: (res) => {
          this.changePasswordForm.reset();
          this.changePassSubmitted = false;
          this.errorMessage = "";
        },
        error: (err) => (this.errorMessage = err.error.text),
      });
    }
  }

  editProfile() {
    this.updateProfileSubmitted = true;
    if (this.updateProfileForm.valid && this.updateProfileForm.dirty) {
      this.userService
        .editUser({
          ...this.updateProfileForm.value,
          email: this.userService.getUserName(),
        })
        .subscribe({
          next: (res) => {
            sessionStorage.setItem(
              'user',
              JSON.stringify({ ...this.userService.getUser(), ...res })
            );
          },
          error: (err) => console.log(err),
        });
    }
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageFile = file;
    }
  }

  addProfileImage() {
    if (this.imageExtensions.indexOf(this.imageFile.type) === -1) {
      this.imgErrMsg = true;
    } else {
      const formData = new FormData();
      formData.append('profileImage', this.imageFile);
      this.imgErrMsg = false;
      this.userService.addProfileImage(formData).subscribe({
        next: (res) => {
          this.profileImage = 'http://localhost:8080/' + res;
          sessionStorage.setItem(
            'user',
            JSON.stringify({ ...this.userService.getUser(), profileImage: res })
          );
        },
        error: (err) => console.log(err.error.text),
      });
    }
  }
}

const passwordMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmNewPassword');

  return password!.value !== confirmPassword!.value ? { misMatch: true } : null;
};
