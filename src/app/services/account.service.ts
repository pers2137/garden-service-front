import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http
    .post(
      'http://' + environment.host + ':' + environment.port + '/api/account/change/password',
      {
        userId: 2,
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    );
  }
}
