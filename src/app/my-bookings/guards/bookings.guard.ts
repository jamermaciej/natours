import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { MyBookingsStore } from '../data-access/my-bookings-store';
import { FlowRoutes } from '../../shared/enums/flow-routes';

export const bookingsGuard: CanActivateFn = async (): Promise<boolean | UrlTree> => {
  const store = inject(MyBookingsStore);
  const router = inject(Router);

  try {
    await store.load();
    return true;
  } catch {
    return router.createUrlTree([FlowRoutes.MY_BOOKINGS]);
  }
};
