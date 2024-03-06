import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { Tour } from '../../interfaces/tour';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  providers: [
    provideImgixLoader(environment.imgixUrl)
  ],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourCardComponent {
  @Input({ required: true })
  tour!: Tour;
}
