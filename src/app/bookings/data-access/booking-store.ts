import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Booking } from "../interfaces/booking";
import { inject } from "@angular/core";
import { BookingService } from "../../shared/data-access/bookings/booking.service";
import { lastValueFrom } from "rxjs";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

export interface BookingState {
    bookings: Booking[];
    isLoading: boolean;
}

const initialState: BookingState = {
    bookings: [],
    isLoading: false
}

export const BookingStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withDevtools('bookings'),
    withState(initialState),
    withMethods((
        store,
        bookingService = inject(BookingService)
    ) => ({
        async load() {            
            if (!store.bookings().length) {
                patchState(store, { isLoading: true });
                const response = await lastValueFrom(bookingService.getMyBookings());
                patchState(store, { bookings: response.data.data, isLoading: false });
            }
        },
        isTourBooked(tourId: string) {
            return !!store.bookings().filter(booking => booking.tour._id === tourId).length;
        },
        clearState() {
            patchState(store, initialState)
        }
    })),
    withHooks({
        onDestroy(store) {
            patchState(store, initialState);
        },
    })
);