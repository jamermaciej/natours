import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { RefundBookingData } from '../interfaces/refund-booking-data';
import { Booking } from '../../bookings/interfaces/booking';
import { BookingService } from '../../bookings/data-access/booking.service';
import { CancelBookingRequest } from '../../bookings/enums/cancel-booking-request';
import { MyBookingsStore } from '../../my-bookings/data-access/my-bookings-store';
import { Store } from '@ngrx/store';
import { toursActions } from '../../tours/data-access/store/tours/tours.actions';
import { BookingStatus } from '../../tours/enums/booking-status';
import { HttpErrorResponse } from '@angular/common/http';
import { Pagination } from '../../shared/interfaces/pagination';
import { BookingListItem } from '../../bookings/interfaces/booking-list-item';
import GlobalFunctions from '../../shared/helpers/GlobalFunctions';
import dayjs from 'dayjs';
import { BOOKING_STATUS_LABELS } from '../../tours/enums/booking-status-labels';
import { BookingFilters } from '../interfaces/booking-filters';
import { SortConfig, SortDirection } from '../../shared/interfaces/sort-config';

export type SortableBookingField =
  | 'reservationNumber'
  | 'user.name'
  | 'tour.name'
  | 'createdAt'
  | 'price'
  | 'status'
  | 'paid';

export interface BookingsState {
  bookings: BookingListItem[];
  pagination: Pagination;
  sort: SortConfig<SortableBookingField>;
  filters: BookingFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
  filters: {
    search: '',
    status: null,
    paid: null,
    dateFrom: '',
    dateTo: '',
    priceMin: null,
    priceMax: null,
  },
  isLoading: false,
  error: null,
};

function formatFilterLabel(key: keyof BookingFilters, value: unknown): string {
  const labels: Partial<Record<keyof BookingFilters, (v: unknown) => string>> = {
    status: v => BOOKING_STATUS_LABELS[v as BookingStatus],
    paid: v => (v ? 'Paid' : 'Unpaid'),
    dateFrom: v => `From: ${v}`,
    dateTo: v => `To: ${v}`,
    priceMin: v => `Min: ${v} PLN`,
    priceMax: v => `Max: ${v} PLN`,
  };
  return labels[key]?.(value) ?? String(value);
}

export const BookingsStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('bookings'),
  withState(initialState),
  withComputed(({ bookings }) => ({
    minDate: computed(() => {
      const dates = bookings().map(b => new Date(b.createdAt));
      return dates.length ? new Date(Math.min(...dates.map(d => d.getTime()))) : null;
    }),
    maxDate: computed(() => {
      const dates = bookings().map(b => new Date(b.createdAt));
      return dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : null;
    }),
    minPrice: computed(() => {
      const prices = bookings().map(b => b.price);
      return prices.length ? Math.min(...prices) : null;
    }),
    maxPrice: computed(() => {
      const prices = bookings().map(b => b.price);
      return prices.length ? Math.max(...prices) : null;
    }),
  })),
  withComputed(({ bookings, filters }) => ({
    filtered: computed(() => {
      const data = bookings();
      const { search, status, paid, dateFrom, dateTo, priceMin, priceMax } = filters();
      const query = search.toLowerCase();

      return data.filter(booking => {
        const matchSearch =
          !search ||
          booking.reservationNumber.toLowerCase().includes(query) ||
          booking.user.name.toLowerCase().includes(query) ||
          booking.tour.name.toLowerCase().includes(query);

        const matchStatus = !status || booking.status === status;
        const matchPaid = paid === null || booking.paid === Boolean(paid);
        const matchFrom =
          !dateFrom ||
          dayjs(booking.createdAt).startOf('day') >= dayjs(dateFrom, 'DD.MM.YYYY').startOf('day');
        const matchTo =
          !dateTo ||
          dayjs(booking.createdAt).startOf('day') <= dayjs(dateTo, 'DD.MM.YYYY').startOf('day');
        const matchPrice =
          (priceMin === null || booking.price >= priceMin) &&
          (priceMax === null || booking.price <= priceMax);

        return matchSearch && matchStatus && matchPaid && matchFrom && matchTo && matchPrice;
      });
    }),
  })),
  withComputed(({ bookings, sort, filtered }) => ({
    sorted: computed(() => {
      const { field, direction } = sort();

      return field
        ? [...filtered()].sort((a, b) => {
            const valA = GlobalFunctions.getValueByPath(a, field);
            const valB = GlobalFunctions.getValueByPath(b, field);

            if (valA == null) return 1;
            if (valB == null) return -1;

            const order = valA < valB ? -1 : valA > valB ? 1 : 0;
            return direction === 'desc' ? -order : order;
          })
        : bookings();
    }),
  })),
  withComputed(({ pagination, sorted, filtered }) => ({
    paginated: computed(() => {
      const { page, limit } = pagination();

      return sorted().slice((page - 1) * limit, page * limit);
    }),
    totalPages: computed(() => Math.ceil(filtered().length / pagination().limit)),
  })),
  withComputed(store => ({
    activeFilters: computed(() =>
      (Object.entries(store.filters()) as [keyof BookingFilters, unknown][])
        .filter(
          ([k, v]) =>
            v !== null &&
            v !== '' &&
            k !== 'search' &&
            !(k === 'priceMin' && v === store.minPrice()) &&
            !(k === 'priceMax' && v === store.maxPrice()),
        )
        .map(([key, value]) => ({
          key: key,
          label: formatFilterLabel(key, value),
        })),
    ),
  })),
  withMethods(
    (
      store,
      bookingService = inject(BookingService),
      myBookingsStore = inject(MyBookingsStore),
      s = inject(Store),
    ) => {
      async function loadData() {
        try {
          patchState(store, { isLoading: true });
          const response = await lastValueFrom(bookingService.getAllBookings());
          patchState(store, {
            bookings: response.data.data,
            isLoading: false,
            pagination: {
              ...store.pagination(),
              total: (response.results || response.data.data.length) ?? 0,
            },
          });
        } catch (err) {
          const errorMessage =
            err instanceof HttpErrorResponse
              ? 'Failed to load bookings. Please try again.'
              : 'Something went wrong. Please try again.';
          patchState(store, { isLoading: false, error: errorMessage });
          throw err;
        }
      }

      return {
        async load() {
          if (store.bookings().length) return;
          await loadData();
        },
        async reload() {
          patchState(store, { error: null });
          await loadData();
        },
        async removeBooking(id: string) {
          await lastValueFrom(bookingService.removeBooking(id));

          patchState(store, state => ({
            bookings: state.bookings.filter(booking => booking._id !== id),
          }));

          patchState(myBookingsStore, state => ({
            bookings: state.bookings.filter(b => b._id !== id),
          }));
        },
        async updateBooking(id: string, data: Partial<Booking>) {
          const response = await lastValueFrom(bookingService.updateBooking(id, data));
          if (store.bookings().length) {
            patchState(store, {
              bookings: store.bookings().map(b => (b._id === id ? response.data.data : b)),
            });
          }
          return response.data.data;
        },
        async refundPayment(id: string, status: BookingStatus, data: RefundBookingData) {
          const response = await lastValueFrom(bookingService.refundPayment(id, data));
          const updatedBooking = response.data.data;

          patchState(store, {
            bookings: store.bookings().map(b => (b._id === id ? updatedBooking : b)),
          });

          patchState(myBookingsStore, state => ({
            bookings: state.bookings.map(b => (b._id === id ? updatedBooking : b)),
          }));

          if (
            updatedBooking.status === BookingStatus.REFUNDED &&
            status !== BookingStatus.CANCELLED
          ) {
            s.dispatch(
              toursActions.decrementParticipants({
                tourId: updatedBooking.tour._id,
                startDate: updatedBooking.startDate,
              }),
            );
          }

          return response.data.data;
        },
        async cancelBooking(id: string, data: CancelBookingRequest) {
          const response = await lastValueFrom(bookingService.cancelBooking(id, data));
          const updatedBooking = response.data.data;

          patchState(store, {
            bookings: store.bookings().map(b => (b._id === id ? updatedBooking : b)),
          });

          patchState(myBookingsStore, state => ({
            bookings: state.bookings.map(b => (b._id === id ? updatedBooking : b)),
          }));

          return updatedBooking;
        },
        prevPage() {
          patchState(store, ({ pagination }) => ({
            pagination: {
              ...pagination,
              page: pagination.page - 1,
            },
          }));
        },
        nextPage() {
          patchState(store, ({ pagination }) => ({
            pagination: {
              ...pagination,
              page: pagination.page + 1,
            },
          }));
        },
        setPage(page: number) {
          patchState(store, ({ pagination }) => ({
            pagination: {
              ...pagination,
              page,
            },
          }));
        },
        setLimit(limit: number) {
          patchState(store, ({ pagination }) => ({
            pagination: {
              ...pagination,
              limit,
              page: 1,
            },
          }));
        },
        setSort(field: SortableBookingField) {
          const sort = store.sort();
          const direction: SortDirection =
            sort.field !== field
              ? 'asc'
              : sort.direction === 'asc'
                ? 'desc'
                : sort.direction === 'desc'
                  ? null
                  : 'asc';

          patchState(store, ({ pagination }) => ({
            pagination: {
              ...pagination,
              page: 1,
            },
            sort: {
              field: direction === null ? null : field,
              direction,
            },
          }));
        },
        setFilter(filters: Partial<BookingFilters>) {
          patchState(store, ({ pagination }) => ({
            pagination: {
              ...pagination,
              page: 1,
            },
            filters: {
              ...store.filters(),
              ...filters,
            },
          }));
        },
        removeFilter(key: keyof BookingFilters) {
          patchState(store, ({ filters }) => ({
            filters: {
              ...filters,
              [key]: initialState.filters[key],
            },
          }));
        },
        clearFilter() {
          patchState(store, {
            filters: initialState.filters,
          });
        },
        clearState() {
          patchState(store, initialState);
        },
      };
    },
  ),
  withHooks({
    onInit(store) {
      store.load();
    },
    onDestroy(store) {
      patchState(store, initialState);
    },
  }),
);
