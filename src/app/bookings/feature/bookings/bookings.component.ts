import { Component, OnInit, computed, inject } from '@angular/core';
import { BookingStore } from '../../data-access/booking-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { BookingsListComponent } from '../../ui/bookings-list/bookings-list.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [LoaderComponent, PageHeaderComponent, BookingsListComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  #bookingStore = inject(BookingStore);
  bookings = this.#bookingStore.bookings;
  isLoading = this.#bookingStore.isLoading

  ngOnInit() {
    this.#bookingStore.load();
  }
}
