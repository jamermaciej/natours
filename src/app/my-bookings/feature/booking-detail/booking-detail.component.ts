import { Component, computed, inject, input, resource } from '@angular/core';

import { Booking } from '../../../shared/interfaces/booking';
import { MyBookingsStore } from '../../data-access/my-bookings-store';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { GuidesListComponent } from '../../../admin/ui/guides-list/guides-list.component';
import { InfoBoxComponent } from '../../../shared/ui/info-box/info-box.component';
import { InfoCardComponent } from '../../../shared/ui/info-card/info-card.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { BookingRefundedDetailsComponent } from '../../../admin/ui/booking-refunded-details/booking-refunded-details.component';
import { BookingCancellationDetailsComponent } from '../../../admin/ui/booking-cancellation-details/booking-cancellation-details.component';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { BookingDetailHeaderComponent } from '../../ui/booking-detail-header/booking-detail-header.component';
import { BookingActionsService } from '../../../admin/services/booking-actions.service';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-booking-detail',
  imports: [
    ContentWrapperComponent,
    LoaderComponent,
    SectionCardComponent,
    GuidesListComponent,
    InfoBoxComponent,
    InfoCardComponent,
    CurrencyPipe,
    DatePipe,
    BookingDetailHeaderComponent,
    BookingRefundedDetailsComponent,
    BookingCancellationDetailsComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  private readonly bookingActionsService = inject(BookingActionsService);
  private readonly myBookingsStore = inject(MyBookingsStore);
  readonly bookingId = input.required<string>();
  protected readonly flowRoutes = FlowRoutes;
  protected readonly bookingStatus = BookingStatus;

  protected readonly errorMessage = computed(() => {
    const error = this.booking.error() as HttpErrorResponse;
    return error?.error?.message || 'Error';
  });

  protected readonly booking = resource<Booking, string>({
    params: () => this.bookingId(),
    loader: ({ params: id }) => this.myBookingsStore.loadBookingDetail(id),
  });

  cancelBooking(booking: Booking) {
    this.bookingActionsService.openCancelModal(booking).closed.subscribe(booking => {
      if (booking) this.booking.set(booking);
    });
  }
}
