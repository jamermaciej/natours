import { Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ReviewsStore } from '../../../reviews/data-access/reviews.store';

@Component({
  selector: 'app-dashboard',
  imports: [PageWrapperComponent, RouterOutlet, SideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly reviewsStore = inject(ReviewsStore);

  constructor() {
    this.reviewsStore.loadReviews();
  }
}
