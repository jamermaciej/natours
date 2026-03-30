import { CancellationReason } from './cancellation-reason';

export interface CancelBookingRequest {
  reason: CancellationReason;
  note?: string;
}
