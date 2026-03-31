import { Component, computed, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { Booking } from '../../../bookings/interfaces/booking';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingsStore } from '../../data-access/bookings-store';
import { BookingDetailHeaderComponent } from '../../ui/booking-detail-header/booking-detail-header.component';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { InfoCardComponent } from '../../../shared/ui/info-card/info-card.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { InfoBoxComponent } from '../../../shared/ui/info-box/info-box.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { GuidesListComponent } from '../../ui/guides-list/guides-list.component';
import { PaymentToggleComponent } from '../../ui/payment-toggle/payment-toggle.component';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Dialog } from '@angular/cdk/dialog';
import { BookingDateModalComponent } from '../../ui/booking-date-modal/booking-date-modal.component';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { BookingCancellationDetailsComponent } from '../../ui/booking-cancellation-details/booking-cancellation-details.component';
import { BookingRefundedDetailsComponent } from '../../ui/booking-refunded-details/booking-refunded-details.component';
import { CancellationModalComponent } from '../cancellation-modal/cancellation-modal.component';
import { RefundModalComponent } from '../refund-modal/refund-modal.component';

@Component({
  selector: 'app-booking-detail',
  imports: [
    LoaderComponent,
    ErrorMessageComponent,
    BookingDetailHeaderComponent,
    SectionCardComponent,
    InfoCardComponent,
    InfoBoxComponent,
    CurrencyPipe,
    DatePipe,
    GuidesListComponent,
    PaymentToggleComponent,
    BookingCancellationDetailsComponent,
    BookingRefundedDetailsComponent,
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  private readonly bookingsStore = inject(BookingsStore);
  private readonly snackbarService = inject(SnackbarService);
  private dialog = inject(Dialog);
  readonly bookingId = input.required<string>();
  readonly flowRoutes = FlowRoutes;
  readonly bookingStatus = BookingStatus;

  protected readonly booking = resource<Booking, string>({
    params: () => this.bookingId(),
    loader: ({ params: id }) => this.bookingsStore.loadBookingDetail(id),
  });

  protected readonly errorMessage = computed(() => {
    const error = this.booking.error() as HttpErrorResponse;
    return error?.error?.message || 'Error';
  });

  protected readonly paid = linkedSignal(() => this.booking.value()?.paid ?? false);
  protected readonly isUpdating = signal(false);

  protected async updateBooking(booking: Booking, paid: boolean) {
    const previous = this.paid();
    this.paid.set(paid);
    this.isUpdating.set(true);

    try {
      const response = await this.bookingsStore.updateBooking({
        ...booking,
        paid: this.paid(),
      });
      this.booking.set(response);
    } catch (err) {
      this.paid.set(previous);

      const errorMessage =
        err instanceof HttpErrorResponse
          ? err.error.message
          : 'Something went wrong. Please try again.';

      this.snackbarService.error(errorMessage);
    } finally {
      this.isUpdating.set(false);
    }
  }

  openDateModal(booking: Booking) {
    const dialogRef = this.dialog.open<Booking>(BookingDateModalComponent, {
      data: booking,
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop',
    });

    dialogRef.closed.subscribe(booking => {
      if (booking) this.booking.set(booking);
    });
  }

  async openCancelModal(booking: Booking) {
    const dialogRef = this.dialog.open<Booking>(CancellationModalComponent, {
      data: booking,
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      backdropClass: 'cdk-overlay-backdrop',
    });

    dialogRef.closed.subscribe(booking => {
      if (booking) this.booking.set(booking);
    });
  }

  openRefundModal(booking: Booking) {
    const dialogRef = this.dialog.open<Booking>(RefundModalComponent, {
      data: booking,
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      backdropClass: 'cdk-overlay-backdrop',
    });

    dialogRef.closed.subscribe(booking => {
      if (booking) this.booking.set(booking);
    });
  }
}
