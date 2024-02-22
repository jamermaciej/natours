import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toursActions } from '../../data-access/store/tours.actions';
import { toursFeature } from '../../data-access/store/tours.state';
import { TourService } from '../../data-access/tour.service';
import { Store } from '@ngrx/store';
import { TourListComponent } from '../../ui/tour-list/tour-list.component';
import { FooterComponent } from '../../../layout/ui/footer/footer.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, TourListComponent, FooterComponent, LoaderComponent],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent {
  #tourService = inject(TourService);
  // tours: Signal<ApiResponse<Tour[]> | undefined> = toSignal(this.#tourService.getTours());
  #store = inject(Store);
  tours$ = this.#store.select(toursFeature.selectTours);
  isLoading$ = this.#store.select(toursFeature.selectIsLoading);

  ngOnInit(): void {
    this.#store.dispatch(toursActions.loadTours());
  }
}
