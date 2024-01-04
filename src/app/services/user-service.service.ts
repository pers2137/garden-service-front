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



}
