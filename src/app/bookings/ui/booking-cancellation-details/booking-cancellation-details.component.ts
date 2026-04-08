import { Component, computed, input } from '@angular/core';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { BookingCancellation } from '../../interfaces/booking-cancellation';
import { CANCELLATION_REASON_LABELS } from '../../enums/cancellation-reason-labels';
import { Role } from '../../../tours/enums/role';

@Component({
  selector: 'app-booking-cancellation-details',
  imports: [SectionCardComponent, DatePipe, EnumLabelPipe],
  templateUrl: './booking-cancellation-details.component.html',
  styleUrl: './booking-cancellation-details.component.scss',
})
export class BookingCancellationDetailsComponent {
  readonly cancellation = input.required<BookingCancellation>();
  readonly currentUserId = input<string>();
  readonly isAdminView = input<boolean>(false);
  protected readonly cancellationReasonLabel = CANCELLATION_REASON_LABELS;

  protected readonly cancelledByLabel = computed(() => {
    const { cancelledBy } = this.cancellation();

    if (this.isAdminView()) {
      const role = cancelledBy.role === Role.ADMIN ? 'Admin' : 'Customer';
      return `${cancelledBy.name} (${cancelledBy.email}) · ${role}`;
    }

    return cancelledBy._id === this.currentUserId() ? 'You' : 'Tour operator';
  });
}
