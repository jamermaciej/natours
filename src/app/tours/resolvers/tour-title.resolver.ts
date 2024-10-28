import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, first, map, tap } from 'rxjs';
import { toursFeature } from '../data-access/store/tours/tours.state';

export const tourTitleResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store = inject(Store)
): Observable<string> => (
  inject(Store).select(toursFeature.selectTour).pipe(
    map(tour => tour?.name ? `Tour | ${tour?.name}` : `Tour`
    )
  )
);
