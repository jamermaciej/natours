import { Component, computed, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsStore } from '../../data-access/bookings-store';
import { CommonTableComponent } from '../../../shared/ui/common-table/common-table.component';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableColumnType } from '../../../shared/enums/table-column-type';
import { TableColumn } from '../../../shared/interfaces/table-column';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../../shared/ui/confirm-modal/confirm-modal.component';
import { ConfirmDialogData } from '../../../shared/interfaces/confirm-dialog-data';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { Booking } from '../../../shared/interfaces/booking';

@Component({
  selector: 'app-bookings',
  imports: [
    LoaderComponent,
    PageHeaderComponent,
    CommonTableComponent,
    RouterLink,
    StatusBadgeComponent,
    ContentWrapperComponent,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  private actionsTemplate = viewChild<TemplateRef<any>>('actionsTemplate');
  private paidTemplate = viewChild<TemplateRef<any>>('paidTemplate');
  private bookigStatusTemplate = viewChild<TemplateRef<any>>('bookigStatusTemplate');

  readonly #dialog = inject(Dialog);
  readonly #bookingsStore = inject(BookingsStore);
  readonly #snackbarService = inject(SnackbarService);
  protected readonly bookings = this.#bookingsStore.bookings;
  protected readonly isLoading = this.#bookingsStore.isLoading;

  protected readonly tableConfig: TableConfig = {
    showRowNumbers: true,
  };

  protected columns = computed<TableColumn[]>(() => [
    { key: 'reservationNumber', header: '#', type: TableColumnType.TEXT },
    { key: 'user.name', header: 'User', type: TableColumnType.TEXT },
    { key: 'tour.name', header: 'Tour', type: TableColumnType.TEXT },
    { key: 'createdAt', header: 'Booked date', type: TableColumnType.DATE, format: 'dd MMM yyyy' },
    { key: 'price', header: 'Price', type: TableColumnType.CURRENCY },
    {
      key: 'status',
      header: 'Status',
      type: TableColumnType.CUSTOM,
      cssClass: 'text-center',
      templateRef: this.bookigStatusTemplate(),
    },
    {
      key: 'paid',
      header: 'Paid',
      type: TableColumnType.CUSTOM,
      cssClass: 'text-center',
      templateRef: this.paidTemplate(),
    },
    { header: 'Action', type: TableColumnType.ACTION, templateRef: this.actionsTemplate() },
  ]);

  protected readonly flowRoutes = FlowRoutes;

  ngOnInit() {
    this.#bookingsStore.load();
  }

  async deleteBooking(booking: Booking) {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Booking',
      message: `Are you sure you want to delete booking for <strong>${booking.user.name} - ${booking.tour.name} no. ${booking.reservationNumber}</strong>? This action cannot be undone.`,
      confirmText: 'Delete',
      confirmButtonClass: 'btn--red',
      onConfirm: async () => {
        await this.#bookingsStore.removeBooking(booking._id);
        this.#snackbarService.success(`Booking ${booking.reservationNumber} deleted successfully`);
      },
    };

    this.#dialog.open<ConfirmDialogData>(ConfirmModalComponent, {
      data: dialogData,
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop',
    });
  }
}
