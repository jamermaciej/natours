import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Review } from '../../../interfaces/review';
import { environment } from '../../../../../environments/environment';
import { NgClass } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-tour-reviews',
  standalone: true,
  imports: [NgClass, CarouselModule],
  templateUrl: './tour-reviews.component.html',
  styleUrl: './tour-reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourReviewsComponent {
  @Input({ required: true}) reviews!: Review[]; 

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
