import { RefundReason } from './refund-reason';

export const REFUND_REASON_LABELS: Record<RefundReason, string> = {
  [RefundReason.DUPLICATE]: 'Duplicate',
  [RefundReason.FRAUDULENT]: 'Fraudulent',
  [RefundReason.REQUESTED_BY_CUSTOMER]: 'Requested by customer',
};
