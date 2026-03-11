import { Component, computed, inject, TemplateRef, viewChild } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsStore } from '../../data-access/bookings-store';
import { CommonTableComponent } from '../../../shared/ui/common-table/common-table.component';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableColumnType } from '../../../shared/enums/table-column-type';
import { TableColumn } from '../../../shared/interfaces/table-column';
import { Booking } from '../../../bookings/interfaces/booking';

@Component({
  selector: 'app-bookings',
  imports: [LoaderComponent, PageHeaderComponent, CommonTableComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  private actionsTemplate = viewChild<TemplateRef<any>>('actionsTemplate');
  private paidTemplate = viewChild<TemplateRef<any>>('paidTemplate');

  readonly #bookingsStore = inject(BookingsStore);
  protected readonly bookings = this.#bookingsStore.bookings;
  protected readonly isLoading = this.#bookingsStore.isLoading;

  protected readonly tableConfig: TableConfig = {
    showRowNumbers: true
  }

  protected columns = computed<TableColumn[]>(() => [
    { key: 'reservationNumber', header: '#', type: TableColumnType.TEXT },
    { key: 'user.name', header: 'User', type: TableColumnType.TEXT },
    { key: 'tour.name', header: 'Tour', type: TableColumnType.TEXT },
    { key: 'createdAt', header: 'Booked date', type: TableColumnType.DATE, format: 'dd MMM yyyy' },
    { key: 'price', header: 'Price', type: TableColumnType.CURRENCY },
    { key: 'paid', header: 'Paid', type: TableColumnType.CUSTOM, templateRef: this.paidTemplate() },
    { header: 'Action', type: TableColumnType.ACTION, templateRef: this.actionsTemplate() }
  ]);
  
  ngOnInit() {
    this.#bookingsStore.load();
  }

  editBooking(booking: Booking) {
    console.log(booking);
  }

  deleteBooking(booking: Booking) {
    console.log(booking);
  }
}
