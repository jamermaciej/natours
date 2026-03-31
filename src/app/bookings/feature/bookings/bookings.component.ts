import { Component, OnInit, inject } from '@angular/core';
import { BookingStore } from '../../data-access/booking-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { BookingsListComponent } from '../../ui/bookings-list/bookings-list.component';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-bookings',
  imports: [LoaderComponent, PageHeaderComponent, BookingsListComponent, ContentWrapperComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  #bookingStore = inject(BookingStore);
  bookings = this.#bookingStore.bookings;
  isLoading = this.#bookingStore.isLoading;

  ngOnInit() {
    this.#bookingStore.load();
  }
}
