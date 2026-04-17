import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { RefundBookingData } from '../interfaces/refund-booking-data';
import { Booking } from '../../bookings/interfaces/booking';
import { BookingService } from '../../bookings/data-access/booking.service';
import { CancelBookingRequest } from '../../bookings/enums/cancel-booking-request';
import { MyBookingsStore } from '../../my-bookings/data-access/my-bookings-store';
import { Store } from '@ngrx/store';
import { toursActions } from '../../tours/data-access/store/tours/tours.actions';
import { BookingStatus } from '../../tours/enums/booking-status';

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
  withMethods(
    (
      store,
      bookingService = inject(BookingService),
      myBookingsStore = inject(MyBookingsStore),
      s = inject(Store),
    ) => ({
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

        patchState(myBookingsStore, state => ({
          bookings: state.bookings.filter(b => b._id !== id),
        }));
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
      async refundPayment(id: string, status: BookingStatus, data: RefundBookingData) {
        const response = await lastValueFrom(bookingService.refundPayment(id, data));
        const updatedBooking = response.data.data;

        patchState(store, {
          bookings: store.bookings().map(b => (b._id === id ? updatedBooking : b)),
        });

        patchState(myBookingsStore, state => ({
          bookings: state.bookings.map(b => (b._id === id ? updatedBooking : b)),
        }));

        if (
          updatedBooking.status === BookingStatus.REFUNDED &&
          status !== BookingStatus.CANCELLED
        ) {
          s.dispatch(
            toursActions.decrementParticipants({
              tourId: updatedBooking.tour._id,
              startDate: updatedBooking.startDate,
            }),
          );
        }

        return response.data.data;
      },
      async cancelBooking(id: string, data: CancelBookingRequest) {
        const response = await lastValueFrom(bookingService.cancelBooking(id, data));
        const updatedBooking = response.data.data;

        patchState(store, {
          bookings: store.bookings().map(b => (b._id === id ? updatedBooking : b)),
        });

        patchState(myBookingsStore, state => ({
          bookings: state.bookings.map(b => (b._id === id ? updatedBooking : b)),
        }));

        return updatedBooking;
      },
      clearState() {
        patchState(store, initialState);
      },
    }),
  ),
  withHooks({
    onDestroy(store) {
      patchState(store, initialState);
    },
  }),
);
