import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toursFeature } from '../../data-access/store/tours.state';
import { CommonModule } from '@angular/common';
import { toursActions } from '../../data-access/store/tours.actions';
import { TourDetailsComponent } from '../../ui/tour-details/tour-details.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, TourDetailsComponent, LoaderComponent, RouterOutlet],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent implements OnInit {
  #store = inject(Store);
  #titleService = inject(Title);
  @Input() slug!: string;
  tour$ = this.#store.select(toursFeature.selectTour).pipe(
    tap(tour => this.#titleService.setTitle(`Tour | ${tour?.name}`))
  );
  isLoading$ = this.#store.select(toursFeature.selectIsLoading);

  ngOnInit(): void {
    this.#store.dispatch(toursActions.loadTours());
  }
}
