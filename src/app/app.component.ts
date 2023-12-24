import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatDrawerMode } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild('sidenav') sidenav!: MatSidenav;
  newTodo = false;

  title = 'garden-service-front';
  mode = new FormControl('over' as MatDrawerMode);

  constructor(
    public userService: UserServiceService
  ) {}
 
  createNewTodo() {
    this.newTodo = true;
  }

  toggolMenuClick() {
    this.sidenav.toggle();
  }

  isUserLogged() {
    return this.userService.getLoggedUser() !== null && this.userService.getLoggedUser() !== undefined;
  }
}
