import { Component, computed, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsStore } from '../../data-access/bookings-store';
import { CommonTableComponent } from '../../../shared/ui/common-table/common-table.component';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableColumnType } from '../../../shared/enums/table-column-type';
import { TableColumn } from '../../../shared/interfaces/table-column';
import { RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { Booking } from '../../../shared/interfaces/booking';
import { BookingActionsService } from '../../services/booking-actions.service';

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

  readonly #bookingsStore = inject(BookingsStore);
  readonly #bookingActionsService = inject(BookingActionsService);
  protected readonly bookings = this.#bookingsStore.bookings;
  protected readonly isLoading = this.#bookingsStore.isLoading;

  protected readonly tableConfig: TableConfig = {
    showRowNumbers: true,
  };

  protected columns = computed<TableColumn[]>(() => [
    {
      key: 'reservationNumber',
      header: 'Reservation no.',
      type: TableColumnType.TEXT,
      cssClass: 'text-center',
    },
    { key: 'user.name', header: 'User', type: TableColumnType.TEXT },
    { key: 'tour.name', header: 'Tour', type: TableColumnType.TEXT },
    {
      key: 'createdAt',
      header: 'Booked date',
      type: TableColumnType.DATE,
      cssClass: 'text-center',
      format: 'dd.MM.yyyy',
    },
    { key: 'price', header: 'Price', type: TableColumnType.CURRENCY, cssClass: 'text-center' },
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
    this.#bookingActionsService.openDeleteModal(booking);
  }
}
