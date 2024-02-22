import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { toursActions } from './tours.actions';
import { Tour } from '../../interfaces/tour';
import { selectRouteParams } from '../../../shared/data-access/store/router.selectors';

export interface State {
    tours: Tour[];
    isLoading: boolean;
    error: string | null;
}

export const initialState: State = {
    tours: [],
    isLoading: false,
    error: null,
};

const reducer = createReducer(
  initialState,
  on(toursActions.loadTours, (state) => ({ ...state, isLoading: true, error: null })),
  on(toursActions.loadToursSuccess, (state, { tours }) => ({
    ...state,
    tours,
    isLoading: false,
    error: null
  })),
  on(toursActions.loadToursFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  }))
);

export const toursFeature = createFeature({
  name: 'tours',
  reducer,
  extraSelectors: ({ selectTours }) => ({
    selectTour: createSelector(
      selectTours,
      selectRouteParams,
      (tours, { slug }) => tours.find(t => t.slug === slug)
    )
  })
});