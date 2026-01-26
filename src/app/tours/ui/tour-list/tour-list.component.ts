import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tour } from '../../interfaces/tour';
import { TourCardComponent } from '../tour-card/tour-card.component';

@Component({
    selector: 'app-tour-list',
    imports: [TourCardComponent],
    templateUrl: './tour-list.component.html',
    styleUrl: './tour-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourListComponent {
  @Input({ required: true })
  tours!: Tour[];
}
