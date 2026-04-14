import { inject, Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';
import { ConfirmDialogData } from '../../shared/interfaces/confirm-dialog-data';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../shared/ui/confirm-modal/confirm-modal.component';

import { SnackbarService } from '../../shared/services/snackbar.service';
import { FlowRoutes } from '../../shared/enums/flow-routes';
import { Router } from '@angular/router';
import { BookingsStore } from '../../admin/data-access/bookings-store';
import { CancellationModalComponent } from '../features/cancellation-modal/cancellation-modal.component';
import { BOOKING_CANCEL_STORE, BookingCancelStore } from '../interfaces/booking-cancel-store';
import { patchState } from '@ngrx/signals';

@Injectable({
  providedIn: 'root',
})
export class BookingActionsService {
  readonly #router = inject(Router);
  readonly #dialog = inject(Dialog);
  readonly #bookingsStore = inject(BookingsStore);
  readonly #snackbarService = inject(SnackbarService);

  openDeleteModal(booking: Booking, redirectTo?: FlowRoutes) {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Booking',
      message: `Are you sure you want to delete booking for <strong>${booking.user.name} - ${booking.tour.name} no. ${booking.reservationNumber}</strong>? This action cannot be undone.`,
      confirmText: 'Delete',
      confirmButtonClass: 'btn--red',
      onConfirm: async () => {
        await this.#bookingsStore.removeBooking(booking._id);
        if (redirectTo) await this.#router.navigate([redirectTo]);
        this.#snackbarService.success(`Booking ${booking.reservationNumber} deleted successfully`);
      },
    };

    const dialogRef = this.#dialog.open<ConfirmDialogData>(ConfirmModalComponent, {
      data: dialogData,
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop',
    });

    return dialogRef;
  }

  openCancelModal(booking: Booking, store: BookingCancelStore, isAdminView = false) {
    const ref = this.#dialog.open<Booking>(CancellationModalComponent, {
      data: { booking, isAdminView },
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      backdropClass: 'cdk-overlay-backdrop',
      providers: [{ provide: BOOKING_CANCEL_STORE, useValue: store }],
    });

    if (!isAdminView) {
      ref.closed.subscribe(booking => {
        if (!booking) return;
        patchState(this.#bookingsStore, state => ({
          bookings: state.bookings.map(b => (b._id === booking._id ? booking : b)),
        }));
      });
    }

    return ref;
  }
}
