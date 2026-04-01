import { RefundReason } from '../enums/refund-reason';

export interface RefundBookingData {
  reason: RefundReason | null;
  amount: number;
  note: string;
}
