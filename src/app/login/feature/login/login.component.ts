import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { map } from 'rxjs';
import { LoadStatus } from '../../../tours/enums/load-status';
import { CommonModule } from '@angular/common';
import { Creditionals } from '../../../shared/interfaces/creditionals';

@Component({
    selector: 'app-login',
    imports: [PageWrapperComponent, LoginFormComponent, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  #store = inject(Store);
  isLoading$ = this.#store.select(authFeature.selectLoadStatus).pipe(
    map(loadStatus => loadStatus === LoadStatus.LOADING)
  );
  errorMessage$ = this.#store.select(authFeature.selectError);

  login(creditionals: Creditionals) {
    const { email, password } = creditionals;
    this.#store.dispatch(authActions.login({ email, password }));
  }
}
