import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import * as routerEffects from './shared/data-access/router/store/router.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authFeature } from './shared/data-access/auth/store/auth.state';
import * as authEffects from './shared/data-access/auth/store/auth.effects';
import { errorInterceptor } from './shared/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    provideStore({
      router: routerReducer
    }),
    provideEffects(routerEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    provideAnimations(),
    provideEffects(authEffects),
    provideState(authFeature)
]
};
