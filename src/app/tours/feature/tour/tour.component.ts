import { Component, DestroyRef, Input, Signal, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toursFeature } from '../../data-access/store/tours/tours.state';
import { CommonModule } from '@angular/common';
import { TourDetailsComponent } from '../../ui/tour-details/tour-details.component';

import { Router } from '@angular/router';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { ReviewsStore } from '../../../reviews/data-access/reviews.store';
import { Tour } from '../../interfaces/tour';
import { BookingStatus } from '../../enums/booking-status';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { BookingService } from '../../../bookings/data-access/booking.service';

@Component({
  selector: 'app-tour',
  imports: [CommonModule, TourDetailsComponent],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss',
})
export class TourComponent {
  #store = inject(Store);
  #destroyRef = inject(DestroyRef);
  #bookingService = inject(BookingService);
  #reviewStore = inject(ReviewsStore);
  router = inject(Router);
  @Input() slug!: string;
  user$ = this.#store.select(authFeature.selectUser);
  isLoggedIn$ = this.#store.select(authFeature.selectIsLoggedIn).pipe(
    filter(isLoggedIn => isLoggedIn),
    tap(() => {
      this.#reviewStore.loadReviews();
    }),
  );
  private readonly isLoggedIn = toSignal(this.#store.select(authFeature.selectIsLoggedIn));
  tour: Signal<Tour | undefined> = toSignal(this.#store.select(toursFeature.selectTour));

  isProccessingPayment = signal(false);

  private readonly isTourBooked = rxResource<
    ApiResponse<{ status: BookingStatus | null }>,
    string | undefined
  >({
    params: () => (this.isLoggedIn() ? this.tour()?._id : undefined),
    stream: ({ params: tourId }) => this.#bookingService.checkTourBookingStatus(tourId),
  });

  protected readonly isBooked = computed(() => !!this.isTourBooked.value()?.data.data.status);

  isTourRewieved = computed(() => this.#reviewStore.isTourReviewed(this.slug));

  bookTour(data: { tourId: string; date: Date }) {
    this.isProccessingPayment.set(true);
    const { tourId, date } = data;

    this.#bookingService
      .bookTour(tourId, date)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((s: any) => (window.location.href = s.session.url));
  }
}
