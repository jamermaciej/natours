import { emptyProps, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { createActionGroup } from '@ngrx/store';

export const routerActions = createActionGroup({
  source: 'Router',
  events: {
    'Go': props<{
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }>(),
    'Back': emptyProps(),
    'Forward': emptyProps()
  },
});