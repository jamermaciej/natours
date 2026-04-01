import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toursFeature } from '../../data-access/store/tours/tours.state';
import { Store } from '@ngrx/store';
import { TourListComponent } from '../../ui/tour-list/tour-list.component';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { RecommendedToursComponent } from '../recommended-tours/recommended-tours.component';

@Component({
  selector: 'app-tours',
  imports: [CommonModule, TourListComponent, PageWrapperComponent, RecommendedToursComponent],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})
export class ToursComponent {
  #store = inject(Store);
  tours$ = this.#store.select(toursFeature.selectTours);
}
