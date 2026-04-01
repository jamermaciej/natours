import { Component, OnInit, inject } from '@angular/core';
import { MyBookingsStore } from '../../data-access/my-bookings-store';
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
  #myBookingStore = inject(MyBookingsStore);
  bookings = this.#myBookingStore.bookings;
  isLoading = this.#myBookingStore.isLoading;

  ngOnInit() {
    this.#myBookingStore.load();
  }
}
