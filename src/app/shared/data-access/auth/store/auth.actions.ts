import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../interfaces/user';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': props<{ message: string }>(),
    'Logout Success': props<{ message: string }>(),
    'Logout Failure': emptyProps(),
  },
});