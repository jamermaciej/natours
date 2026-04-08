import { Component, computed, inject, input, resource, Signal } from '@angular/core';

import { Booking } from '../../../bookings/interfaces/booking';
import { MyBookingsStore } from '../../data-access/my-bookings-store';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { GuidesListComponent } from '../../../bookings/ui/guides-list/guides-list.component';
import { InfoBoxComponent } from '../../../shared/ui/info-box/info-box.component';
import { InfoCardComponent } from '../../../shared/ui/info-card/info-card.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { BookingRefundedDetailsComponent } from '../../../bookings/ui/booking-refunded-details/booking-refunded-details.component';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { BookingDetailHeaderComponent } from '../../ui/booking-detail-header/booking-detail-header.component';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingCancellationDetailsComponent } from '../../../bookings/ui/booking-cancellation-details/booking-cancellation-details.component';
import { BookingActionsService } from '../../../bookings/services/booking-actions.service';
import dayjs from 'dayjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { User } from '../../../shared/interfaces/user';
import { Store } from '@ngrx/store';

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
  private readonly store = inject(Store);
  private readonly bookingActionsService = inject(BookingActionsService);
  private readonly myBookingsStore = inject(MyBookingsStore);
  readonly bookingId = input.required<string>();
  protected readonly flowRoutes = FlowRoutes;
  protected readonly bookingStatus = BookingStatus;

  protected readonly user: Signal<User | null> = toSignal(
    this.store.select(authFeature.selectUser),
    {
      initialValue: null,
    },
  );

  protected readonly errorMessage = computed(() => {
    const error = this.booking.error() as HttpErrorResponse;
    return error?.error?.message || 'Error';
  });

  protected readonly canCancel = computed(() => {
    const b = this.booking.value();
    return b?.status === BookingStatus.ACTIVE && dayjs(b?.startDate).diff(dayjs(), 'hour') >= 168;
  });

  protected readonly booking = resource<Booking, string>({
    params: () => this.bookingId(),
    loader: ({ params: id }) => this.myBookingsStore.loadBookingDetail(id),
  });

  cancelBooking(booking: Booking) {
    this.bookingActionsService
      .openCancelModal(booking, this.myBookingsStore)
      .closed.subscribe(booking => {
        if (booking) this.booking.set(booking);
      });
  }
}
