import { Routes } from '@angular/router';

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
      }
    ]
  }
];
