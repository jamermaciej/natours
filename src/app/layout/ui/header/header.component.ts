import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/interfaces/user';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';


@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule, UserImgComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #store = inject(Store);
  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), { initialValue: null });
  readonly flowRoutes = FlowRoutes;

  logout() {
    this.#store.dispatch(authActions.logout({ message: 'Logged out successfully!'}));
  }
}
