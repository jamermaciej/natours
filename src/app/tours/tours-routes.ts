import { Routes } from '@angular/router';
import { tourTitleResolver } from './resolvers/tour-title.resolver';
import { tourDetailsGuard } from './guards/tour-details.guard';
import { provideState } from '@ngrx/store';
import { toursFeature } from './data-access/store/tours/tours.state';
import * as toursEffects from './data-access/store/tours/tours.effects';
import { provideEffects } from '@ngrx/effects';
import { dataGuard } from './guards/data.guard';

export const routes: Routes = [
    {
    path: '',
    providers: [
      provideEffects(toursEffects),
      provideState(toursFeature)
    ],
    canActivate: [dataGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./feature/tours/tours.component').then(m => m.ToursComponent),
        title: 'Tours'
      },
      {
        path: ':slug',
        loadComponent: () => import('./feature/tour/tour.component').then(m => m.TourComponent),
        canActivate: [tourDetailsGuard],
        title: tourTitleResolver
      }
    ]
  }
];
