import { RefundReason } from './refund-reason';

export interface RefundBookingData {
  reason: RefundReason | null;
  amount: number;
  note: string;
}
