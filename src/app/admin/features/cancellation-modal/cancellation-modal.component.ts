import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ModalLayoutComponent } from '../../../shared/ui/modal-layout/modal-layout.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingsStore } from '../../data-access/bookings-store';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Booking } from '../../../bookings/interfaces/booking';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { CancellationReason } from '../../../bookings/models/cancellation-reason';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { CANCELLATION_REASON_LABELS } from '../../../bookings/models/cancellation-reason-labels';
import { FormsModule, NgModel } from '@angular/forms';

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
  private readonly bookingsStore = inject(BookingsStore);
  private readonly snackbarService = inject(SnackbarService);
  protected dialogRef = inject(DialogRef<Booking>);
  protected readonly booking = inject<Booking>(DIALOG_DATA);

  private readonly reasonSelectRef = viewChild<NgModel>('reasonSelect');

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  protected reason = signal<CancellationReason | null>(null);
  protected note = signal<string>('');
  readonly isValid = computed(() => !!this.reason());
  protected showErrors = signal(false);

  protected readonly cancellationReason = Object.values(CancellationReason);
  protected readonly cancellationReasonLabel = CANCELLATION_REASON_LABELS;

  async onConfirm() {
    this.reasonSelectRef()?.control.markAsTouched();

    if (!this.isValid()) {
      this.showErrors.set(true);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const newBooking = await this.bookingsStore.cancelBooking(this.booking._id, {
        reason: this.reason()!,
        note: this.note(),
      });

      this.snackbarService.success(
        `Booking ${this.booking.reservationNumber} cancelled successfully`,
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
