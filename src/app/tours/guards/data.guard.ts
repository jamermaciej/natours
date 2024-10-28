import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { toursActions } from '../data-access/store/tours/tours.actions';
import { toursFeature } from '../data-access/store/tours/tours.state';
import { LoadStatus } from '../enums/load-status';

export const dataGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> => {
  const store = inject(Store);
  store.dispatch(toursActions.getTours());

  return store.select(toursFeature.selectLoadStatus).pipe(
    filter(loadStatus => loadStatus === LoadStatus.LOADED),
    map(() => true)
  )
};
