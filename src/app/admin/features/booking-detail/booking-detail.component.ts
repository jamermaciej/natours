import { Component, computed, inject, input, resource } from '@angular/core';
import { BookingService } from '../../../shared/data-access/bookings/booking.service';
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
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  bookingId = input.required<string>();
  readonly bookingService = inject(BookingService);
  readonly bookingsStore = inject(BookingsStore);
  readonly flowRoutes = FlowRoutes;

  booking = resource<Booking, string>({
    params: () => this.bookingId(),
    loader: ({ params: id }) => this.bookingsStore.loadBookingDetail(id),
  });

  errorMessage = computed(() => {
    const error = this.booking.error() as HttpErrorResponse;
    return error?.error?.message || 'Error';
  });
}
