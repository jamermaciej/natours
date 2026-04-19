import { Component, computed, inject, input, Signal } from '@angular/core';
import { Booking } from '../../../bookings/interfaces/booking';
import { MyBookingsStore } from '../../data-access/my-bookings-store';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { GuidesListComponent } from '../../../bookings/ui/guides-list/guides-list.component';
import { InfoBoxComponent } from '../../../shared/ui/info-box/info-box.component';
import { InfoCardComponent } from '../../../shared/ui/info-card/info-card.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { DatePipe } from '@angular/common';
import { BookingRefundedDetailsComponent } from '../../../bookings/ui/booking-refunded-details/booking-refunded-details.component';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { BookingDetailHeaderComponent } from '../../ui/booking-detail-header/booking-detail-header.component';
import { BookingCancellationDetailsComponent } from '../../../bookings/ui/booking-cancellation-details/booking-cancellation-details.component';
import { BookingActionsService } from '../../../bookings/services/booking-actions.service';
import dayjs from 'dayjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { User } from '../../../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { ReviewsStore } from '../../../reviews/data-access/reviews.store';
import { RouterLink } from '@angular/router';
import { AppCurrencyPipe } from '../../../shared/pipes/app-currency.pipe';

@Component({
  selector: 'app-booking-detail',
  imports: [
    ContentWrapperComponent,
    SectionCardComponent,
    GuidesListComponent,
    InfoBoxComponent,
    InfoCardComponent,
    AppCurrencyPipe,
    DatePipe,
    BookingDetailHeaderComponent,
    BookingRefundedDetailsComponent,
    BookingCancellationDetailsComponent,
    RouterLink,
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  private readonly store = inject(Store);
  private readonly bookingActionsService = inject(BookingActionsService);
  private readonly myBookingsStore = inject(MyBookingsStore);
  private readonly myReviewsStore = inject(ReviewsStore);
  protected readonly bookingId = input.required<string>();
  protected readonly flowRoutes = FlowRoutes;
  protected readonly bookingStatus = BookingStatus;

  protected readonly user: Signal<User | null> = toSignal(
    this.store.select(authFeature.selectUser),
    {
      initialValue: null,
    },
  );

  protected readonly booking = computed(
    () => this.myBookingsStore.loadBookingDetail(this.bookingId())!,
  );

  protected readonly canCancel = computed(() => {
    const b = this.booking();
    return (
      (b?.status === BookingStatus.ACTIVE || b?.status === BookingStatus.PARTIAL_REFUND) &&
      dayjs(b?.startDate).diff(dayjs(), 'hour') >= 168
    );
  });

  protected readonly canBookAgain = computed(() => {
    return (
      this.booking()?.status !== this.bookingStatus.ACTIVE &&
      this.booking()?.status !== this.bookingStatus.PARTIAL_REFUND &&
      !this.myBookingsStore
        .bookings()
        .some(b => b.tour._id === this.booking()?.tour._id && b.status === BookingStatus.ACTIVE)
    );
  });

  protected isReviewable() {
    return (
      this.booking()?.status === BookingStatus.ACTIVE &&
      dayjs(this.booking()?.startDate).isBefore(dayjs()) &&
      !this.myReviewsStore.hasReview(this.booking().tour._id)
    );
  }

  cancelBooking(booking: Booking) {
    this.bookingActionsService.openCancelModal(booking, this.myBookingsStore);
  }
}
