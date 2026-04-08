import { Component, Signal, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/interfaces/user';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';
import { ROLE_LABELS } from '../../../tours/enums/role-labels';

@Component({
  selector: 'app-header',
  imports: [RouterModule, UserImgComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  #store = inject(Store);
  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), {
    initialValue: null,
  });
  readonly flowRoutes = FlowRoutes;
  protected readonly roleLabels = ROLE_LABELS;

  logout() {
    this.#store.dispatch(authActions.logout({ message: 'Logged out successfully!' }));
  }
}
