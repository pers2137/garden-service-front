import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-setting-snackbar',
  templateUrl: './save-setting-snackbar.component.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class SaveSettingSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
