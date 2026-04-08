import { RefundReason } from '../../admin/enums/refund-reason';
import { User } from '../../shared/interfaces/user';

export interface BookingRefunded {
  refundedAt: Date;
  amount: number;
  reason: RefundReason;
  refundedBy?: Pick<User, 'name' | 'email'>;
  note?: string;
}
