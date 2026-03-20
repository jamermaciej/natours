import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { BookingService } from '../../shared/data-access/bookings/booking.service';
import { lastValueFrom } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Booking } from '../../bookings/interfaces/booking';

export interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
}

const initialState: BookingsState = {
  bookings: [],
  isLoading: false,
};

export const BookingsStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('bookings'),
  withState(initialState),
  withMethods((store, bookingService = inject(BookingService)) => ({
    async load() {
      if (!store.bookings().length) {
        patchState(store, { isLoading: true });
        const response = await lastValueFrom(bookingService.getAllBookings());
        patchState(store, { bookings: response.data.data, isLoading: false });
      }
    },
    async removeBooking(id: string) {
      await lastValueFrom(bookingService.removeBooking(id));
      patchState(store, {
        bookings: store.bookings().filter(booking => booking._id !== id),
      });
    },
    async loadBookingDetail(id: string) {
      const existing = store.bookings().find(b => b._id === id);
      if (existing) return existing;

      return (await lastValueFrom(bookingService.getBooking(id))).data.data;
    },
    async updateBooking(booking: Booking) {
      const response = await lastValueFrom(bookingService.updateBooking(booking));
      if (store.bookings().length) {
        patchState(store, {
          bookings: store.bookings().map(b => (b._id === booking._id ? response.data.data : b)),
        });
      }
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
