import { Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';
import { DatePipe } from '@angular/common';
import { BookingsStore } from '../../data-access/bookings-store';
import { HttpErrorResponse } from '@angular/common/http';
import { StartDate } from '../../../tours/interfaces/start-date';
import { Booking } from '../../../bookings/interfaces/booking';

@Component({
  selector: 'app-booking-date-modal',
  imports: [ErrorMessageComponent, DatePipe],
  templateUrl: './booking-date-modal.component.html',
  styleUrl: './booking-date-modal.component.scss',
})
export class BookingDateModalComponent {
  private readonly bookingStore = inject(BookingsStore);
  readonly dialogRef = inject(DialogRef<Booking>);
  readonly data = inject<Booking>(DIALOG_DATA);

  protected readonly isUpdating = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly selectedDate = signal(this.data.startDate);

  protected readonly isDateChanged = computed(
    () => new Date(this.selectedDate()).getTime() !== new Date(this.data.startDate).getTime(),
  );

  protected onCancel() {
    this.dialogRef.close();
  }

  protected async onConfirm() {
    this.isUpdating.set(true);
    this.error.set(null);

    try {
      const updatedBooking = await this.bookingStore.updateBooking(this.data._id, {
        startDate: this.selectedDate(),
      });
      this.dialogRef.close(updatedBooking);
    } catch (err) {
      const errorMessage =
        err instanceof HttpErrorResponse
          ? err.error.message
          : 'Something went wrong. Please try again.';

      this.error.set(errorMessage);
    } finally {
      this.isUpdating.set(false);
    }
  }

  protected isPast(date: Date): boolean {
    return new Date(date) < new Date();
  }

  protected isDisabled(date: StartDate): boolean {
    return date.soldOut || this.isPast(date.date);
  }

  protected spotsLeft(date: StartDate): number {
    return this.data.tour.maxGroupSize - date.participants;
  }
}
