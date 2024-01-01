import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-warning-snack-bar',
  templateUrl: './edit-warning-snack-bar.component.html',
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
export class EditWarningSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
