import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-warning-snack-bar',
  templateUrl: './add-warning-snack-bar.component.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ]
})
export class AddWarningSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
