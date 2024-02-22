import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tour } from '../../interfaces/tour';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourDetailsComponent {
  @Input({ required: true })
  tour!: Tour;
}
