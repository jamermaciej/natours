import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../shared/data-access/auth/store/auth.state';
import { map } from 'rxjs';
import { FlowRoutes } from '../enums/flow-routes';

export const guestGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(authFeature.selectIsLoggedIn).pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate([FlowRoutes.PROFILE]);
      }

      return true;
    })
  )
};
