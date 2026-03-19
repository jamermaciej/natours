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
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  private readonly bookingsStore = inject(BookingsStore);
  private readonly snackbarService = inject(SnackbarService);
  readonly bookingId = input.required<string>();
  readonly flowRoutes = FlowRoutes;

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
      const response = (
        await this.bookingsStore.updateBooking({
          ...booking,
          paid: this.paid(),
        })
      ).data.data;
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
}
