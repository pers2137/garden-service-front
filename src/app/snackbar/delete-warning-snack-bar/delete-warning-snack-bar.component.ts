import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-warning-snack-bar',
  templateUrl: './delete-warning-snack-bar.component.html',
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
export class DeleteWarningSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
