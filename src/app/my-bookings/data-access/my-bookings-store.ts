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

export interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
}

const initialState: BookingState = {
  bookings: [],
  isLoading: false,
};

export const MyBookingsStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('my-bookings'),
  withState(initialState),
  withComputed(({ bookings }) => ({
    upcomingBookings: computed(() =>
      bookings().filter(booking => new Date(booking.startDate) >= new Date()),
    ),
    pastBookings: computed(() =>
      bookings().filter(booking => new Date(booking.startDate) < new Date()),
    ),
  })),
  withMethods((store, bookingService = inject(BookingService)) => ({
    async load() {
      if (!store.bookings().length) {
        patchState(store, { isLoading: true });
        const response = await lastValueFrom(bookingService.getMyBookings());
        patchState(store, { bookings: response.data.data, isLoading: false });
      }
    },
    async loadBookingDetail(id: string) {
      const existing = store.bookings().find(b => b._id === id);
      if (existing) return existing;

      return (await lastValueFrom(bookingService.getBooking(id))).data.data;
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
  })),
  withHooks({
    onDestroy(store) {
      patchState(store, initialState);
    },
  }),
);
