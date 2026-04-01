import { RefundReason } from '../enums/refund-reason';
import { User } from '../../shared/interfaces/user';

export interface BookingRefunded {
  refundedAt: Date;
  refundedBy: Pick<User, 'name' | 'email'>;
  amount: number;
  reason?: RefundReason;
  note?: string;
}
