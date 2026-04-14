import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { FlowRoutes } from '../../shared/enums/flow-routes';
import { Booking } from '../../bookings/interfaces/booking';
import { MyBookingsStore } from '../data-access/my-bookings-store';
import { EMPTY, of } from 'rxjs';
import { SnackbarService } from '../../shared/services/snackbar.service';

export const bookingDetailResolver: ResolveFn<Booking> = route => {
  const store = inject(MyBookingsStore);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);
  const id = route.paramMap.get('bookingId');

  const booking = store.loadBookingDetail(id!);

  if (!booking) {
    snackbarService.error(`Booking with ID ${id} not found`, 5000);
    router.navigate([FlowRoutes.MY_BOOKINGS]);
    return EMPTY;
  }

  return of(booking);
};
