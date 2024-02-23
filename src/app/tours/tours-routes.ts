import { Routes } from '@angular/router';
import { tourTitleResolver } from './resolvers/tour-title.resolver';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./feature/tour/tour.component').then(m => m.TourComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: ':slug',
        loadComponent: () => import('./feature/tour/tour.component').then(m => m.TourComponent),
        title: tourTitleResolver
      }
    ]
  }
];
