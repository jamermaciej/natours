import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { LoadStatus } from '../../../../tours/enums/load-status';
import { User } from '../../../interfaces/user';
import { authActions } from './auth.actions';
import { constants } from '../../../constants/constants';

export interface State {
    isLoggedIn: boolean;
    user: User | null;
    loadStatus: LoadStatus;
    error: string | null;
}

export const initialState: State = {
    isLoggedIn: !!JSON.parse(localStorage.getItem(constants.CURRENT_USER)!) || false,
    user: JSON.parse(localStorage.getItem(constants.CURRENT_USER)!) || null,
    loadStatus: LoadStatus.NOT_LOADED,
    error: null,
};

const reducer = createReducer(
  initialState,
    on(authActions.login, (state) => ({
        ...state,
        loadStatus: LoadStatus.LOADING,
        error: null
    })),
    on(authActions.loginSuccess, (state, { user }) => ({
        ...state,
        isLoggedIn: true,
        user,
        loadStatus: LoadStatus.LOADED,
        error: null
    })),
    on(authActions.loginFailure, (state, { error }) => ({
        ...state,
        isLoggedIn: false,
        error,
        loadStatus: LoadStatus.NOT_LOADED,
    })),
    on(authActions.logoutSuccess, (state) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        error: null
    })),
);

export const authFeature = createFeature({
  name: 'auth',
  reducer
});