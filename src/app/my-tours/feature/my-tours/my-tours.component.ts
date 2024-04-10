import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { bookingsActions } from '../../data-access/store/my-tours.actions';
import { myToursFeature } from '../../data-access/store/my-tours.state';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { TourListComponent } from '../../../tours/ui/tour-list/tour-list.component';
import { Tour } from '../../../tours/interfaces/tour';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LoadStatus } from '../../../tours/enums/load-status';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-my-tours',
  standalone: true,
  imports: [CommonModule, PageWrapperComponent, TourListComponent, LoaderComponent],
  templateUrl: './my-tours.component.html',
  styleUrl: './my-tours.component.scss'
})
export class MyToursComponent implements OnInit {
  #store = inject(Store);

  myTours: Signal<Tour[]> = toSignal(this.#store.select(myToursFeature.selectMyTours), { initialValue: [] });
  isLoading$ = this.#store.select(myToursFeature.selectLoadStatus).pipe(
    map(loadStauts => LoadStatus.LOADING === loadStauts)
  );

  ngOnInit(): void {
    this.#store.dispatch(bookingsActions.getMyBookedTours());
  }
}
