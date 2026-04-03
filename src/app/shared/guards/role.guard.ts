import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../data-access/auth/store/auth.state';
import { map, take } from 'rxjs';
import { FlowRoutes } from '../enums/flow-routes';
import { Role } from '../../tours/enums/role';

export const roleGuard =
  (roles: Role[]): CanActivateFn =>
  () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(authFeature.selectUser).pipe(
      take(1),
      map(user => {
        const hasAccess = !!user && roles.includes(user.role);
        if (!hasAccess) router.navigate([FlowRoutes.PROFILE]);
        return hasAccess;
      }),
    );
  };
