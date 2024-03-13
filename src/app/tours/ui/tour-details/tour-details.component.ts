import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { RolePipe } from '../../../shared/pipes/role.pipe';
import { SplitParagraphPipe } from '../../../shared/pipes/split-paragraph.pipe';
import { TourReviewsComponent } from './tour-reviews/tour-reviews.component';
import { TourMapComponent } from './tour-map/tour-map.component';
import { Tour } from '../../interfaces/tour';
import { RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule, RolePipe, SplitParagraphPipe, TourReviewsComponent, TourMapComponent, RouterLink],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourDetailsComponent {
  @Input({ required: true })
  tour!: Tour;

  readonly toursImgUrl = `${environment.apiHostUrl}/img/tours/`;
  readonly flowRoutes = FlowRoutes;
}
