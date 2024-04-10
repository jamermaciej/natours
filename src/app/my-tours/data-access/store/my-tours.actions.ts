import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tour } from '../../../tours/interfaces/tour';

export const bookingsActions = createActionGroup({
  source: 'Bookings',
  events: {
    'Get My Booked Tours': emptyProps(),
    'Load My Booked Tours': emptyProps(),
    'Load My Booked Tours Success': props<{ tours: Tour[] }>(),
    'Load My Booked Tours Failure': props<{ error: string }>(),
  },
});