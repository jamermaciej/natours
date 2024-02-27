import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { toursFeature } from '../data-access/store/tours.state';

export const tourDetailsGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);
    
  return store.select(toursFeature.selectTour).pipe(
    map(tour => tour ? true : router.createUrlTree(['/tours']))
  )
};
