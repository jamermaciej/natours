import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toursFeature } from '../../data-access/store/tours.state';
import { CommonModule } from '@angular/common';
import { toursActions } from '../../data-access/store/tours.actions';
import { TourDetailsComponent } from '../../ui/tour-details/tour-details.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, TourDetailsComponent, LoaderComponent, RouterOutlet],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent implements OnInit {
  #store = inject(Store);
  @Input() slug!: string;
  tour$ = this.#store.select(toursFeature.selectTour);
  isLoading$ = this.#store.select(toursFeature.selectIsLoading);

  ngOnInit(): void {
    this.#store.dispatch(toursActions.loadTours());
  }
}
