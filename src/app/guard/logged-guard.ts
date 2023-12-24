import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';


@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(
        public userService: UserServiceService,
        public router: Router
    ) {}
    
    canActivate() {
        if (!this.userService.ifActiveUser()) {
            return true;
        }
        this.router.navigate(['station-view']);
        return false;
    }
}
