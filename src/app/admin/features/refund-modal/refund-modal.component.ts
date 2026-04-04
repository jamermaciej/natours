import { Component, inject, signal } from '@angular/core';
import { RefundReason } from '../../enums/refund-reason';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalLayoutComponent } from '../../../shared/ui/modal-layout/modal-layout.component';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { BookingsStore } from '../../data-access/bookings-store';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { RefundBookingData } from '../../interfaces/refund-booking-data';
import { CurrencyPipe } from '@angular/common';
import { Booking } from '../../../bookings/interfaces/booking';
import { REFUND_REASON_LABELS } from '../../enums/refund-reason-labels';

@Component({
  selector: 'app-refund-modal',
  imports: [
    ModalLayoutComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatError,
    EnumLabelPipe,
    ReactiveFormsModule,
    MatSelectModule,
    FormField,
    CurrencyPipe,
  ],
  templateUrl: './refund-modal.component.html',
  styleUrl: './refund-modal.component.scss',
})
export class RefundModalComponent {
  private readonly bookingsStore = inject(BookingsStore);
  private readonly snackbarService = inject(SnackbarService);
  protected dialogRef = inject(DialogRef<Booking>);
  protected readonly booking = inject<Booking>(DIALOG_DATA);

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  protected readonly refundReason = Object.values(RefundReason);
  protected readonly refundReasonLabel = REFUND_REASON_LABELS;

  private readonly refund = signal<RefundBookingData>({
    reason: null,
    amount: this.booking.price,
    note: '',
  });

  protected readonly refundForm = form(this.refund, path => {
    required(path.reason);
    disabled(path.amount);
  });

  async onConfirm() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const newBooking = await this.bookingsStore.refundPayment(
        this.booking._id,
        this.refundForm().value(),
      );
      this.snackbarService.success(`Payment refunded successfully`);
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
