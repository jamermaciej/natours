import { BookingStatus } from './booking-status';

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: 'Pending',
  [BookingStatus.ACTIVE]: 'Active',
  [BookingStatus.CANCELLED]: 'Cancelled',
  [BookingStatus.PARTIAL_REFUND]: 'Partial refund',
  [BookingStatus.REFUNDED]: 'Refunded',
};
