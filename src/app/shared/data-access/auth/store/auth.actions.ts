import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { SignupData } from '../../../interfaces/signup-data';
import { PasswordUpdateData } from '../../../interfaces/password-update-data';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Signup': props<{ signupData: SignupData }>(),
    'Signup Success': props<{ user: User }>(),
    'Signup Failure': props<{ error: string }>(),
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': props<{ message: string }>(),
    'Logout Success': props<{ message: string }>(),
    'Logout Failure': emptyProps(),
    'Get Me': emptyProps(),
    'Get Me Success': props<{ user: User }>(),
    'Get Me Failure': props<{ error: string }>(),
    'Update Me': props<{ user: User, callback: () => void }>(),
    'Update Success': props<{ user: User }>(),
    'Update Failure': props<{ error: string }>(),
    'Update Password': props<{ passwordUpdateData: PasswordUpdateData, callback: () => void }>(),
    'Update Password Success': props<{ user: User }>(),
    'Update Password Failure': props<{ error: string }>(),
  },
});