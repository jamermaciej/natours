import { CancellationReason } from './cancellation-reason';

export const CANCELLATION_REASON_LABELS: Record<CancellationReason, string> = {
  [CancellationReason.CUSTOMER_REQUEST]: 'Customer requested cancellation',
  [CancellationReason.NO_SHOW]: 'Customer no show',
  [CancellationReason.DUPLICATE]: 'Duplicate booking',
  [CancellationReason.TOUR_CANCELLED]: 'Tour cancelled',
  [CancellationReason.OTHER]: 'Other',
};
