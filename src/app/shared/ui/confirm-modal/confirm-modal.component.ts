import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { ConfirmDialogData } from '../../interfaces/confirm-dialog-data';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-modal',
  imports: [ErrorMessageComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  readonly dialogRef = inject(DialogRef<boolean>);
  readonly data = inject<ConfirmDialogData>(DIALOG_DATA);

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly confirmText = this.data.confirmText || 'Confirm';
  readonly cancelText = this.data.cancelText || 'Cancel';
  readonly confirmBtnClass = this.data.confirmButtonClass || 'btn--outline';

  onCancel() {
    this.dialogRef.close(false);
  }

  async onConfirm() {
    if (this.data.onConfirm) {
      this.isLoading.set(true);
      this.error.set(null);

      try {
        await this.data.onConfirm();
        this.dialogRef.close(true);
      } catch (err) {
        this.isLoading.set(false);

        const errorMessage = err instanceof HttpErrorResponse 
        ? err.error.message 
        : 'Something went wrong. Please try again.';
      
        this.error.set(errorMessage);
      }
    } else {
      this.dialogRef.close(true);
    }
  }
}
