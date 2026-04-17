import { RefundReason } from '../../admin/enums/refund-reason';
import { User } from '../../shared/interfaces/user';

export interface BookingRefund {
  _id: string;
  stripeRefundId: string;
  refundedAt: Date;
  amount: number;
  reason: RefundReason;
  refundedBy?: Pick<User, 'name' | 'email'>;
  note?: string;
}
