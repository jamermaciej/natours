import { inject, Injectable } from '@angular/core';
import { Booking } from '../../shared/interfaces/booking';
import { ConfirmDialogData } from '../../shared/interfaces/confirm-dialog-data';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../shared/ui/confirm-modal/confirm-modal.component';

import { SnackbarService } from '../../shared/services/snackbar.service';
import { FlowRoutes } from '../../shared/enums/flow-routes';
import { Router } from '@angular/router';
import { BookingsStore } from '../../admin/data-access/bookings-store';
import { CancellationModalComponent } from '../../admin/features/cancellation-modal/cancellation-modal.component';

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

  openCancelModal(booking: Booking) {
    return this.#dialog.open<Booking>(CancellationModalComponent, {
      data: booking,
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      backdropClass: 'cdk-overlay-backdrop',
    });
  }
}
