import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveSettingSnackbarComponent } from './save-setting-snackbar/save-setting-snackbar.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent {

  public userDto = {};

  public password = {oldPassword: "", newPassword: "", repeatedPassword: ""};
  public userName = "admin";

  public hideOldPassword = true;
  public hideNewPassword = true;
  public hideRepeatedPassword = true;


  public errors: any = [];
  public success: any = [];

  constructor(public router: Router,
              private accountService: AccountService,
              private _snackBar: MatSnackBar) {}

  changePassword() {
    this.errors = [];
    this.success = [];
    if(this.password.oldPassword === "") {
      this.errors.push("Podaj stare hasło!");
    }
    
    if(this.password.newPassword === "") {
      this.errors.push("Podaj nowe hasło!");
    }

    if(this.password.repeatedPassword === "") {
      this.errors.push("Powtórz nowe hasło!");
    }

    if(this.errors.length !== 0) {
      return;
    }

    if(this.password.newPassword !== this.password.repeatedPassword) {
      this.errors.push("Podane nowe hasła nie są identyczne!");
      return;
    }

    if(this.password.newPassword.length < 5) {
      this.errors.push("Hasło musi mieć co najmniej 5 znaków!");
      return;
    }

    if(this.password.newPassword === this.password.oldPassword) {
      this.errors.push("Nowe hasło musi być inne niż stare!");
      return;
    }
    console.log("ok :)");
    this.accountService.changePassword(this.password.oldPassword, this.password.newPassword).subscribe(
      () => {
        this.success.push("Hasło zostało zmienione!");
        this._snackBar.openFromComponent(SaveSettingSnackbarComponent, {
          duration: 2500,
        });
      }, 
      error => {
            console.log(error);
            if (error.error.code === "account.missing-information") {
              this.errors.push("Wypełnij wszystkie pola!");
            } else if(error.error.code === "account.password-to-weak") {
              this.errors.push("Hasło jest za słabe!");
            } else if(error.error.code === "account.wrong-old-password") {
              this.errors.push("Niepoprawne stare hasło!");
            } else if(error.error.code === "account.password-already-used") {
              this.errors.push("Nowe hasło musi być różne od starego!");
            } else {
              this.errors.push("Occurs unexpected error please try later.")
            }
          }
      );
  }

  cancel() {
    this.errors = [];
    this.success = [];
    this.password = {oldPassword: "", newPassword: "", repeatedPassword: ""};
  }
}
