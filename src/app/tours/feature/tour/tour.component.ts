import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toursFeature } from '../../data-access/store/tours.state';
import { CommonModule } from '@angular/common';
import { TourDetailsComponent } from '../../ui/tour-details/tour-details.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, TourDetailsComponent, LoaderComponent],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent {
  #store = inject(Store);
  router = inject(Router);
  @Input() slug!: string;
  tour$ = this.#store.select(toursFeature.selectTour);
}
