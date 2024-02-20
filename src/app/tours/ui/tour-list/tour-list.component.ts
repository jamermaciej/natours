import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tour } from '../../interfaces/tour';
import { TourCardComponent } from '../tour-card/tour-card.component';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, TourCardComponent],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourListComponent {
  @Input({ required: true })
  tours!: Tour[];
}
