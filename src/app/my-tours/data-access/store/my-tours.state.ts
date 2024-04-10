import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { bookingsActions } from './my-tours.actions';
import { Tour } from '../../../tours/interfaces/tour';
import { LoadStatus } from '../../../tours/enums/load-status';

export interface State {
    myTours: Tour[];
    loadStatus: LoadStatus;
    error: string | null;
}

export const initialState: State = {
    myTours: [],
    loadStatus: LoadStatus.NOT_LOADED,
    error: null,
};

const reducer = createReducer(
  initialState,
  on(bookingsActions.loadMyBookedTours, (state) => ({ ...state, loadStatus: LoadStatus.LOADING, error: null })),
  on(bookingsActions.loadMyBookedToursSuccess, (state, { tours }) => ({
    ...state,
    myTours: tours,
    loadStatus: LoadStatus.LOADED,
    error: null
  })),
  on(bookingsActions.loadMyBookedToursFailure, (state, { error }) => ({
    ...state,
    error,
    loadStatus: LoadStatus.NOT_LOADED,
  }))
);

export const myToursFeature = createFeature({
  name: 'myTours',
  reducer
});