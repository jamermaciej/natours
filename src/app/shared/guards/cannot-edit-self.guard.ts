import { inject, Signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/user';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from '../data-access/auth/store/auth.state';
import { FlowRoutes } from '../enums/flow-routes';

export const cannotEditSelfGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const currentUser: Signal<User | null> = toSignal(store.select(authFeature.selectUser), { initialValue: null });
  const id = route.paramMap.get('userId');

  if (currentUser()?._id === id) {
    router.navigate([FlowRoutes.PROFILE]);
    return false;
  }

  return true;
};
