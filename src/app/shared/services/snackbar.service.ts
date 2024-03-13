import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  #snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  defaultDuration: number = 3000;

  success(message: string, duration?: number) {
    this.#snackBar.open(message, undefined, {
      duration: duration || this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar-success'
    });
  }

  error(message: string, duration?: number) {
    this.#snackBar.open(message, undefined, {
      duration: duration || this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar-error'
    });
  }

  info(message: string, duration?: number) {
    this.#snackBar.open(message, undefined, {
      duration: duration || this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar-info'
    });
  }
}
