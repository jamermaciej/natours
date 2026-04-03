import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { BookingService } from '../../shared/data-access/bookings/booking.service';
import { lastValueFrom } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { CancelBookingRequest } from '../interfaces/cancel-booking-request';
import { RefundBookingData } from '../interfaces/refund-booking-data';
import { Booking } from '../../shared/interfaces/booking';

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
      const booking = store.bookings().find(b => b._id === id);

      await lastValueFrom(bookingService.removeBooking(id));

      patchState(store, {
        bookings: store
          .bookings()
          .filter(booking => booking._id !== id)
          .map(b => {
            if (b.tour._id !== booking?.tour._id) return b;
            return {
              ...b,
              tour: {
                ...b.tour,
                startDates: b.tour.startDates.map(d =>
                  d.date === booking?.startDate
                    ? { ...d, participants: d.participants - 1, soldOut: false }
                    : d,
                ),
              },
            };
          }),
      });
    },
    async loadBookingDetail(id: string) {
      const existing = store.bookings().find(b => b._id === id);
      if (existing) return existing;

      return (await lastValueFrom(bookingService.getBooking(id))).data.data;
    },
    async updateBooking(id: string, data: Partial<Booking>) {
      const response = await lastValueFrom(bookingService.updateBooking(id, data));
      if (store.bookings().length) {
        patchState(store, {
          bookings: store.bookings().map(b => (b._id === id ? response.data.data : b)),
        });
      }
      return response.data.data;
    },
    async refundPayment(id: string, data: RefundBookingData) {
      const response = await lastValueFrom(bookingService.refundPayment(id, data));

      patchState(store, {
        bookings: store.bookings().map(b => (b._id === id ? response.data.data : b)),
      });

      return response.data.data;
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
