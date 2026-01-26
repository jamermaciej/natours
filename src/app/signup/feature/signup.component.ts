import { Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../../layout/ui/page-wrapper/page-wrapper.component';
import { SignupFormComponent } from '../ui/signup-form/signup-form.component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { LoadStatus } from '../../tours/enums/load-status';
import { authFeature } from '../../shared/data-access/auth/store/auth.state';
import { Creditionals } from '../../shared/interfaces/creditionals';
import { authActions } from '../../shared/data-access/auth/store/auth.actions';
import { AsyncPipe } from '@angular/common';
import { SignupData } from '../../shared/interfaces/signup-data';

@Component({
    selector: 'app-signup',
    imports: [PageWrapperComponent, SignupFormComponent, AsyncPipe],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
  #store = inject(Store);
  isLoading$ = this.#store.select(authFeature.selectLoadStatus).pipe(
    map(loadStatus => loadStatus === LoadStatus.LOADING)
  );
  errorMessage$ = this.#store.select(authFeature.selectError);

  signup(signupData: SignupData) {
    this.#store.dispatch(authActions.signup({ signupData }));
  }
}
