import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onMenuButtonClick = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAddTodoClick = new EventEmitter<any>();

 public userName?: string;

 constructor(
   public userService: UserServiceService,
   public router: Router
 ) { }

 ngOnInit(): void {
  //  this.userName = this.userService.getLoggedUser()?.firstName;
 }

 menuButtonClick() {
   this.onMenuButtonClick.emit();
 }

 goToHome() {
   this.router.navigate(['station-view']);
 }

 addCategoryClick() {
   this.router.navigate(['categories', 'new']);
 }

 goToProfile() {
   this.router.navigate(['account']);
 }


 logout() {
   this.userService.loggedUser = undefined;
   localStorage.removeItem('loggedUser');
   this.router.navigate(['login']);
 }

 addTodoClick() {
   this.router.navigate(['todo-list', 'new']);
 }
}