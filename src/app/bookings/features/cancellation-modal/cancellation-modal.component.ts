import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ModalLayoutComponent } from '../../../shared/ui/modal-layout/modal-layout.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { Booking } from '../../interfaces/booking';
import { CancellationReason } from '../../enums/cancellation-reason';
import {
  ADMIN_CANCELLATION_OPTIONS,
  CANCELLATION_REASON_LABELS,
  USER_CANCELLATION_OPTIONS,
} from '../../enums/cancellation-reason-labels';
import { BOOKING_CANCEL_STORE } from '../../interfaces/booking-cancel-store';
import { CancellationModalData } from '../../interfaces/cancellation-modal-data';

@Component({
  selector: 'app-cancellation-modal',
  imports: [
    ModalLayoutComponent,
    MatSelect,
    MatOption,
    EnumLabelPipe,
    FormsModule,
    MatFormField,
    MatLabel,
    MatError,
  ],
  templateUrl: './cancellation-modal.component.html',
  styleUrl: './cancellation-modal.component.scss',
})
export class CancellationModalComponent {
  private readonly store = inject(BOOKING_CANCEL_STORE);
  private readonly snackbarService = inject(SnackbarService);
  protected dialogRef = inject(DialogRef<Booking>);
  protected readonly data = inject<CancellationModalData>(DIALOG_DATA);
  private readonly reasonSelectRef = viewChild<NgModel>('reasonSelect');

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  protected reason = signal<CancellationReason | null>(null);
  protected note = signal<string>('');
  readonly isValid = computed(() => !!this.reason());
  protected showErrors = signal(false);

  protected readonly cancellationReasonLabel = CANCELLATION_REASON_LABELS;
  protected readonly cancellationReason = computed(() =>
    this.data.isAdminView ? ADMIN_CANCELLATION_OPTIONS : USER_CANCELLATION_OPTIONS,
  );

  async onConfirm() {
    this.reasonSelectRef()?.control.markAsTouched();

    if (!this.isValid()) {
      this.showErrors.set(true);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const newBooking = await this.store.cancelBooking(this.data.booking._id, {
        reason: this.reason()!,
        note: this.note(),
      });

      this.snackbarService.success(
        `Booking ${this.data.booking.reservationNumber} cancelled successfully`,
      );

      this.dialogRef.close(newBooking);
    } catch (err) {
      this.isLoading.set(false);

      const errorMessage =
        err instanceof HttpErrorResponse
          ? err.error.message
          : 'Something went wrong. Please try again.';

      this.error.set(errorMessage);
    } finally {
      this.isLoading.set(false);
    }
  }
}
