import { Pipe, PipeTransform } from '@angular/core';
import { RefundReason } from '../../admin/enums/refund-reason';
import { REFUND_REASON_LABELS } from '../../admin/interfaces/refund-reason-labels';

@Pipe({
  name: 'refundReason',
})
export class RefundReasonPipe implements PipeTransform {
  transform(value: RefundReason): string {
    return REFUND_REASON_LABELS[value] ?? value;
  }
}
