import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Booking } from '../../bookings/interfaces/booking';
import { BookingService } from '../../bookings/data-access/booking.service';
import { CancelBookingRequest } from '../../bookings/enums/cancel-booking-request';
import { LoadStatus } from '../../tours/enums/load-status';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingStatus } from '../../tours/enums/booking-status';
import { ReviewsStore } from '../../reviews/data-access/reviews.store';

export interface BookingState {
  bookings: Booking[];
  loadStatus: LoadStatus;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loadStatus: LoadStatus.NOT_LOADED,
  error: null,
};

export const MyBookingsStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('my-bookings'),
  withState(initialState),
  withComputed(({ bookings, loadStatus }, myReviewsStore = inject(ReviewsStore)) => ({
    upcomingBookings: computed(() =>
      bookings().filter(booking => new Date(booking.startDate) >= new Date()),
    ),
    pastBookings: computed(() =>
      bookings()
        .filter(booking => new Date(booking.startDate) < new Date())
        .map(booking => {
          const hasReview = myReviewsStore.hasReview(booking.tour._id);
          return {
            ...booking,
            isReviewable: booking.status === BookingStatus.ACTIVE && !hasReview,
            hasReview,
          };
        }),
    ),
    isLoading: computed(() => loadStatus() === LoadStatus.LOADING),
  })),
  withMethods((store, bookingService = inject(BookingService)) => {
    async function loadData() {
      patchState(store, { loadStatus: LoadStatus.LOADING });
      try {
        const response = await lastValueFrom(bookingService.getMyBookings());
        patchState(store, { bookings: response.data.data, loadStatus: LoadStatus.LOADED });
      } catch (err) {
        const errorMessage =
          err instanceof HttpErrorResponse
            ? 'Failed to load bookings. Please try again.'
            : 'Something went wrong. Please try again.';
        patchState(store, { loadStatus: LoadStatus.LOADED, error: errorMessage });
        throw err;
      }
    }

    return {
      async load() {
        if (store.loadStatus() === LoadStatus.LOADED) return;
        await loadData();
      },
      async reload() {
        patchState(store, { loadStatus: LoadStatus.NOT_LOADED, error: null });
        await loadData();
      },
      loadBookingDetail(id: string) {
        return store.bookings().find(b => b._id === id);
      },
      async cancelBooking(id: string, data: CancelBookingRequest) {
        const response = await lastValueFrom(bookingService.cancelBooking(id, data));

        patchState(store, {
          bookings: store.bookings().map(b => (b._id === id ? response.data.data : b)),
        });

        return response.data.data;
      },
      clearState() {
        patchState(store, initialState);
      },
    };
  }),
  withHooks({
    onDestroy(store) {
      patchState(store, initialState);
    },
  }),
);
