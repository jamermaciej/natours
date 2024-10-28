import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { toursActions } from './tours.actions';
import { Tour } from '../../../interfaces/tour';
import { selectRouteParams } from '../../../../shared/data-access/router/store/router.selectors';
import { LoadStatus } from '../../../enums/load-status';

export interface State {
    tours: Tour[];
    loadStatus: LoadStatus;
    error: string | null;
}

export const initialState: State = {
    tours: [],
    loadStatus: LoadStatus.NOT_LOADED,
    error: null,
};

const reducer = createReducer(
  initialState,
  on(toursActions.loadTours, (state) => ({ ...state, loadStatus: LoadStatus.LOADING, error: null })),
  on(toursActions.loadToursSuccess, (state, { tours }) => ({
    ...state,
    tours,
    loadStatus: LoadStatus.LOADED,
    error: null
  })),
  on(toursActions.loadToursFailure, (state, { error }) => ({
    ...state,
    error,
    loadStatus: LoadStatus.NOT_LOADED,
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