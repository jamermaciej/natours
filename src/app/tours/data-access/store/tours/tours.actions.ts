import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tour } from '../../../interfaces/tour';

export const toursActions = createActionGroup({
  source: 'Tours',
  events: {
    'Get Tours': emptyProps(),
    'Load Tours': emptyProps(),
    'Load Tours Success': props<{ tours: Tour[] }>(),
    'Load Tours Failure': props<{ error: string }>(),
  },
});