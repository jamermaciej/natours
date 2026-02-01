import { Component, inject, signal } from '@angular/core';
import { BookingsListComponent } from '../../../bookings/ui/bookings-list/bookings-list.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsStore } from '../../data-access/bookings-store';

@Component({
  selector: 'app-bookings',
  imports: [LoaderComponent, PageHeaderComponent, BookingsListComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  readonly #bookingsStore = inject(BookingsStore);
  protected readonly bookings = this.#bookingsStore.bookings;
  protected readonly isLoading = this.#bookingsStore.isLoading;

  ngOnInit() {
    this.#bookingsStore.load();
  }
}
