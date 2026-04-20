import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { FlowRoutes } from '../../shared/enums/flow-routes';
import { Booking } from '../../bookings/interfaces/booking';
import { BookingService } from '../../bookings/data-access/booking.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { catchError, EMPTY, map } from 'rxjs';

export const bookingDetailResolver: ResolveFn<Booking> = route => {
  const bookingService = inject(BookingService);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);
  const id = route.paramMap.get('bookingId')!;

  return bookingService.getBooking(id).pipe(
    map(response => response.data.data),
    catchError(() => {
      snackbarService.error(`Booking with ID ${id} not found`, 5000);
      router.navigate([FlowRoutes.BOOKINGS]);
      return EMPTY;
    }),
  );
};
