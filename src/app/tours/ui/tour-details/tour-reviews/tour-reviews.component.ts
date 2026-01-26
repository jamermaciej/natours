import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Review, ReviewResponse } from '../../../interfaces/review';
import { environment } from '../../../../../environments/environment';
import { NgClass } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RatingComponent } from '../../../../shared/ui/rating/rating.component';

@Component({
    selector: 'app-tour-reviews',
    imports: [NgClass, CarouselModule, RatingComponent],
    templateUrl: './tour-reviews.component.html',
    styleUrl: './tour-reviews.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourReviewsComponent {
  @Input({ required: true}) reviews!: ReviewResponse[]; 

  readonly apiHostUrl = environment.apiHostUrl;

  reviewSliderOptions: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      940: {
        items: 3
      },
      1300: {
        items: 4
      },
      1800: {
        items: 5
      }
    }
  }
}
