import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TourListComponent } from '../../ui/tour-list/tour-list.component';
import { RecommendedToursStore } from '../../data-access/store/recommended-tours/recommended-tours.store';

@Component({
  selector: 'app-recommended-tours',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, TourListComponent],
  templateUrl: './recommended-tours.component.html',
  styleUrl: './recommended-tours.component.scss'
})
export class RecommendedToursComponent {
  readonly recommendedToursStore = inject(RecommendedToursStore);

  ngOnInit() {
    this.recommendedToursStore.loadRecommendedTours();
  }
}
