import {
  Component,
  computed,
  effect,
  inject,
  signal,
  TemplateRef,
  untracked,
  viewChild,
} from '@angular/core';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsStore, SortableBookingField } from '../../data-access/bookings-store';
import { CommonTableComponent } from '../../../shared/ui/common-table/common-table.component';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableColumnType } from '../../../shared/enums/table-column-type';
import { TableColumn } from '../../../shared/interfaces/table-column';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { Booking } from '../../../bookings/interfaces/booking';
import { BookingActionsService } from '../../../bookings/services/booking-actions.service';
import { LoadErrorComponent } from '../../../shared/ui/load-error/load-error.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { BookingListItem } from '../../../bookings/interfaces/booking-list-item';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatOption, MatSelect, MatSuffix } from '@angular/material/select';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { BOOKING_STATUS_LABELS } from '../../../tours/enums/booking-status-labels';
import { FiltersComponent } from '../../../shared/ui/filters/filters.component';
import { debounce, form, FormField, readonly } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import dayjs from 'dayjs';
import { BookingFilters } from '../../interfaces/booking-filters';

export const MY_NATIVE_DATE_FORMATS = {
  parse: {
    dateInput: 'DDD',
  },
  display: {
    dateInput: 'DDD',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DDD',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-bookings',
  imports: [
    LoaderComponent,
    PageHeaderComponent,
    CommonTableComponent,
    RouterLink,
    StatusBadgeComponent,
    ContentWrapperComponent,
    LoadErrorComponent,
    PaginationComponent,
    FormsModule,
    MatSelect,
    MatOption,
    FiltersComponent,
    ReactiveFormsModule,
    FormField,
    MatFormField,
    MatInputModule,
    MatIconModule,
    MatIconButton,
    MatSuffix,
    MatDatepickerModule,
    MatSliderModule,
  ],
  providers: [provideNativeDateAdapter(MY_NATIVE_DATE_FORMATS)],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  private actionsTemplate = viewChild<TemplateRef<any>>('actionsTemplate');
  private paidTemplate = viewChild<TemplateRef<any>>('paidTemplate');
  private bookigStatusTemplate = viewChild<TemplateRef<any>>('bookigStatusTemplate');

  protected readonly bookingsStore = inject(BookingsStore);
  private readonly bookingActionsService = inject(BookingActionsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly error = this.bookingsStore.error;
  protected readonly isLoading = this.bookingsStore.isLoading;
  protected readonly bookings = this.bookingsStore.paginated;
  protected readonly pagination = this.bookingsStore.pagination;
  protected readonly totalPages = this.bookingsStore.totalPages;
  protected readonly sortConfig = this.bookingsStore.sort;
  protected readonly filters = this.bookingsStore.filters;
  protected readonly activeFilters = this.bookingsStore.activeFilters;

  protected readonly tableConfig: TableConfig = {
    showRowNumbers: true,
  };

  protected columns = computed<TableColumn<BookingListItem>[]>(() => [
    {
      key: 'reservationNumber',
      header: 'Reservation no.',
      type: TableColumnType.TEXT,
      cssClass: 'text-center',
    },
    {
      accessor: row => row.user.name,
      header: 'User',
      type: TableColumnType.TEXT,
      sortable: true,
      sortKey: 'user.name',
    },
    {
      accessor: row => row.tour.name,
      header: 'Tour',
      type: TableColumnType.TEXT,
      sortable: true,
      sortKey: 'tour.name',
    },
    {
      key: 'createdAt',
      header: 'Booked date',
      type: TableColumnType.DATE,
      cssClass: 'text-center',
      format: 'dd.MM.yyyy',
      sortable: true,
    },
    {
      key: 'price',
      header: 'Price',
      type: TableColumnType.CURRENCY,
      cssClass: 'text-center',
      digitsInfo: '1.0-2',
    },
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
  protected readonly bookingStatuses = Object.values(BookingStatus);
  protected readonly bookingStatusLabels = BOOKING_STATUS_LABELS;

  private readonly defaultFilters: BookingFilters = {
    search: '',
    status: null,
    paid: null,
    dateFrom: '',
    dateTo: '',
    priceMin: null,
    priceMax: null,
  };

  private readonly bookingFilters = signal<BookingFilters>(this.defaultFilters);

  protected readonly bookingFiltersForm = form(this.bookingFilters, path => {
    debounce(path.search, 300);
    readonly(path.dateFrom);
    readonly(path.dateTo);
  });

  protected readonly dateFromFilter = (date: number | null | undefined): boolean => {
    const dateTo = this.bookingFiltersForm.dateTo().value();
    const minDate = this.bookingsStore.minDate();
    const maxDate = dateTo ? dateTo : this.bookingsStore.maxDate();

    return dayjs(date)
      .startOf('day')
      .isBetween(dayjs(minDate).startOf('day'), dayjs(maxDate).startOf('day'), null, '[]');
  };

  protected readonly dateToFilter = (date: number | null | undefined): boolean => {
    const dateFrom = this.bookingFiltersForm.dateFrom().value();
    const minDate = dateFrom ? dateFrom : this.bookingsStore.minDate();
    const maxDate = this.bookingsStore.maxDate();

    return dayjs(date)
      .startOf('day')
      .isBetween(dayjs(minDate).startOf('day'), dayjs(maxDate).startOf('day'), null, '[]');
  };

  constructor() {
    const params = this.route.snapshot.queryParams;

    this.bookingFilters.set({
      ...this.defaultFilters,
      ...(params['search'] && { search: params['search'] }),
      ...(params['status'] && { status: params['status'] as BookingStatus }),
      ...(params['paid'] && { paid: params['paid'] === 'true' }),
      ...(params['dateFrom'] && { dateFrom: dayjs(params['dateFrom'], 'DD.MM.YYYY').toDate() }),
      ...(params['dateTo'] && { dateTo: dayjs(params['dateTo'], 'DD.MM.YYYY').toDate() }),
      ...(params['priceMin'] && { priceMin: Number(params['priceMin']) }),
      ...(params['priceMax'] && { priceMax: Number(params['priceMax']) }),
    });

    effect(() => {
      const minPrice = this.bookingsStore.minPrice();
      const maxPrice = this.bookingsStore.maxPrice();

      if (minPrice === null || maxPrice === null) return;

      untracked(() => {
        if (this.bookingFilters().priceMin === null) {
          this.bookingFilters.update(c => ({ ...c, priceMin: minPrice }));
        }
        if (this.bookingFilters().priceMax === null) {
          this.bookingFilters.update(c => ({ ...c, priceMax: maxPrice }));
        }
      });

      const filters = this.bookingFiltersForm().value();
      const convertedFilters = {
        ...filters,
        dateFrom: filters.dateFrom ? dayjs(filters.dateFrom).format('DD.MM.YYYY') : '',
        dateTo: filters.dateTo ? dayjs(filters.dateTo).format('DD.MM.YYYY') : '',
      };

      untracked(() => this.bookingsStore.setFilter(convertedFilters));

      const params: Record<string, string> = {};
      Object.entries(convertedFilters).forEach(([key, value]) => {
        if (
          value === null ||
          value === '' ||
          (key === 'priceMin' && value === minPrice) ||
          (key === 'priceMax' && value === maxPrice)
        ) {
          params[key] = null!;
        } else {
          params[key] = String(value);
        }
      });

      this.router.navigate([], {
        queryParams: params,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  async deleteBooking(booking: Booking) {
    this.bookingActionsService.openDeleteModal(booking);
  }

  retry() {
    this.bookingsStore.reload();
  }

  pageChange(page: number) {
    this.bookingsStore.setPage(page);
  }

  prevPage() {
    this.bookingsStore.prevPage();
  }

  nextPage() {
    this.bookingsStore.nextPage();
  }

  sort(field: string) {
    this.bookingsStore.setSort(field as SortableBookingField);
  }

  removeFilter(key: string) {
    const k = key as keyof BookingFilters;
    this.bookingFilters.update(c => ({
      ...c,
      [key]: this.defaultFilters[k],
    }));
    this.bookingsStore.removeFilter(k);

    this.router.navigate([], {
      queryParams: { [key]: null },
      replaceUrl: true,
    });
  }

  clearFilters() {
    this.bookingFiltersForm().reset({ ...this.defaultFilters });
    this.bookingsStore.clearFilter();
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true,
    });
  }
}
