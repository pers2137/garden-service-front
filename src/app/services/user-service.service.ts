import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError, BehaviorSubject } from 'rxjs';

export interface AuthResponseData { 
  userName: string
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public loggedUser?: string;

  constructor(private http: HttpClient) { }

  login(userDto: User) {
    // return this.authService.loginUser(userDto);
    return this.http
    .post<AuthResponseData>(
      'http://' + environment.host + ':' + environment.port + '/api/auth/login',
      {
        userName: userDto.userName,
        password: userDto.password
      }
    )
    .pipe(
      // catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.userName
        );
      })
    );
  }

  private handleAuthentication(userName: string) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // const user = new User(userName, null);
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    // localStorage.setItem('loggedUser', JSON.stringify(userName));
    this.loggedUser = userName;
    localStorage.setItem('loggedUser', userName);
  }


  getLoggedUser() {
    if (this.loggedUser !== null && this.loggedUser !== undefined) {
      return this.loggedUser;
    }
    if (localStorage.getItem('loggedUser') !== null && localStorage.getItem('loggedUser') !== undefined) {
      this.loggedUser = localStorage.getItem('loggedUser')!;
      return this.loggedUser;
    }
    return null;
  }

  ifActiveUser() {
    return this.loggedUser !== null && this.loggedUser !== undefined;
  }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred!';
   
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }

  //   console.log(errorRes);

  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email exists already';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'This email does not exist.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password is not correct.';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }

}
