import { CancellationReason } from './cancellation-reason';

export const CANCELLATION_REASON_LABELS: Record<CancellationReason, string> = {
  [CancellationReason.CUSTOMER_REQUEST]: 'Customer requested cancellation',
  [CancellationReason.NO_SHOW]: 'Customer no show',
  [CancellationReason.DUPLICATE]: 'Duplicate booking',
  [CancellationReason.TOUR_CANCELLED]: 'Tour cancelled',
  [CancellationReason.CHANGE_OF_PLANS]: 'My plans have changed',
  [CancellationReason.WEATHER_ISSUES]: 'Weather conditions',
  [CancellationReason.TRAVEL_DELAYS]: 'Travel delays or transportation issues',
  [CancellationReason.HEALTH_ISSUES]: 'Health issues',
  [CancellationReason.FOUND_BETTER_OFFER]: 'Found a better price/offer',
  [CancellationReason.FINANCIAL_REASONS]: 'Financial reasons',
  [CancellationReason.ACCIDENTAL_BOOKING]: 'Made a mistake during booking',
  [CancellationReason.OTHER]: 'Other',
};

export const USER_CANCELLATION_OPTIONS: CancellationReason[] = [
  CancellationReason.CHANGE_OF_PLANS,
  CancellationReason.ACCIDENTAL_BOOKING,
  CancellationReason.TRAVEL_DELAYS,
  CancellationReason.WEATHER_ISSUES,
  CancellationReason.HEALTH_ISSUES,
  CancellationReason.FOUND_BETTER_OFFER,
  CancellationReason.FINANCIAL_REASONS,
  CancellationReason.OTHER,
];

export const ADMIN_CANCELLATION_OPTIONS: CancellationReason[] = [
  CancellationReason.CUSTOMER_REQUEST,
  CancellationReason.NO_SHOW,
  CancellationReason.DUPLICATE,
  CancellationReason.TOUR_CANCELLED,
  CancellationReason.OTHER,
];
