import { InjectionToken } from '@angular/core';
import { CancelBookingRequest } from '../enums/cancel-booking-request';
import { Booking } from './booking';

export interface BookingCancelStore {
  cancelBooking: (id: string, data: CancelBookingRequest) => Promise<Booking>;
}

export const BOOKING_CANCEL_STORE = new InjectionToken<BookingCancelStore>('BOOKING_CANCEL_STORE');
