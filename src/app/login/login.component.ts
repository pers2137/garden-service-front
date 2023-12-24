import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public userDto: User = {};
  public hide = true;
  public errors: any = [];

  constructor(
    public router: Router,
    public userService: UserServiceService
  ) { }

  // login() {
  //   this.userService.login(this.userDto)
  //                   .subscribe(data => {
  //                       this.userService.loggedUser = data;
  //                       localStorage.setItem('loggedUser', JSON.stringify(data));
  //                       this.router.navigate(['todo-list']);
  //                   },
  //                   error => {
  //                     this.errors = [];
  //                     if (error.error.errors === null) {
  //                       this.errors.push(error.error.message);
  //                     } else {
  //                       this.errors = error.error.errors;
  //                     }
  //                   });
  login() {
    this.userService.login(this.userDto).subscribe(
      restData => {
        console.log(restData);
        this.router.navigate(['/station-view']);
      },
      error => {
        this.errors = [];
        console.log(error);

        if (error.status === 403) {
          this.errors.push("Wrong user name or password !")
        } else if(error.status === 401) {
          this.errors = error.error.errors;
        } else {
          this.errors.push("Occurs unexpected error please try later.")
        }
      }
    );
  }

}
