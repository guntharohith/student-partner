import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  backendUrl = environment.backendUrl
  constructor(private http: HttpClient) {
    
  }

  // noOfUsers = 0;
  // user: any;
  // users: UserModel[] = [
  //   {
  //     firstName: 'guntha',
  //     lastName: 'rohith',
  //     mobileNumber: '9121908816',
  //     email: 'rohithshetty267@gmail.com',
  //     password: 'rohith267',
  //     role: 'user',
  //   },
  //   {
  //     firstName: 'anil',
  //     lastName: 'kumar',
  //     mobileNumber: '9121903333',
  //     email: 'anilkumar@gmail.com',
  //     password: 'anil8888',
  //     role: 'user',
  //   },
  //   {
  //     firstName: 'admin',
  //     lastName: 'admin',
  //     mobileNumber: '938493999',
  //     email: 'admin@gmail.com',
  //     password: 'admin123',
  //     role: 'admin',
  //   },
  // ];

  getAllUsers() {
    return this.http.get<UserModel[]>(this.backendUrl + 'users',
      {
      headers: {
        authorization: "Bearer " + this.getToken()
        }
      }
    )
  }

  deleteUser(email: string) {
    return this.http.delete(this.backendUrl + 'users/' + email,
      {
        headers: {
        authorization: "Bearer " + this.getToken()
      }
    })
  }
  
  addUser(userModel: UserModel) {
    return this.http.post(this.backendUrl + 'users/signup', userModel)
  }

  getUser() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')!);
    }
    return null;
  }

  userLogin(user: { email: string; password: string }) {
    return this.http.post(this.backendUrl + 'users/login', user)
  }


  editUser(user:UserModel) {
    return this.http.patch(this.backendUrl + 'users/' + user.email, user,{
      headers: {
        authorization: 'Bearer ' + this.getToken(),
      },
    });
  }
  logout() {
    sessionStorage.clear();
  }

  getUserName() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')!).email;
    }
    return null
  }

  getRole() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')!).role;
    }
    return null;
  }

  getToken() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')!).token;
    }
    return null;
  }

  getUserId() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')!)._id;
    }
    return null;
  }

  addProfileImage(profileImage:any) {
    return this.http.post(this.backendUrl + 'users/upload-profile-image',profileImage, {
      headers: {
        authorization: 'Bearer ' + this.getToken(),
      },
    });
  }

  getProfileImage() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')!).profileImage;
    }
    return null;
  }

  changePassword(password: string, newPassword: string) {
    return this.http.patch(
      this.backendUrl + 'users/change-password/' + this.getUserName(),
      {
        password,
        newPassword,
      },
      {
        headers: {
          authorization: 'Bearer ' + this.getToken(),
        },
      }
    );
  }

  resetPasswordMail(email: string) {
    return this.http.post(this.backendUrl + 'users/reset-password-email', email)
  }

  resetPassword(details:any) {
    return this.http.post(this.backendUrl + 'users/reset-password',details)
  }

  getAnalytics() {
    return (
      this.http.get <
      {
        numberOfUsers:number,
        numberOfNotes:number,
        numberOfResources:number,
        numberOfLearningPaths:number
      } >
      (this.backendUrl + 'users/get-analytics',
      {
        headers: {
          authorization: 'Bearer ' + this.getToken(),
        },
      })
    );
  }

}

