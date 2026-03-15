import { Component, computed, inject, input, resource } from '@angular/core';
import { BookingService } from '../../../shared/data-access/bookings/booking.service';
import { Booking } from '../../../bookings/interfaces/booking';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingsStore } from '../../data-access/bookings-store';

@Component({
  selector: 'app-booking-detail',
  imports: [LoaderComponent, ErrorMessageComponent],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  bookingId = input.required<string>();
  readonly bookingService = inject(BookingService);
  readonly bookingsStore = inject(BookingsStore);

  booking = resource<Booking, string>({
    params: () => this.bookingId(),
    loader: ({ params: id }) => this.bookingsStore.loadBookingDetail(id)
  });

  errorMessage = computed(() => {
    const error = this.booking.error() as HttpErrorResponse;
    return error?.error?.message || 'Error';
  });
}
