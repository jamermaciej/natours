import { BookingStatus } from '../../tours/enums/booking-status';

export interface BookingFilters {
  search: string;
  status: BookingStatus | null;
  paid: boolean | null;
  dateFrom: string;
  dateTo: string;
  priceMin: number | null;
  priceMax: number | null;
}
