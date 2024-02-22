import { Routes } from '@angular/router';

export const routes: Routes = [
        {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('../home/home.component').then(m => m.HomeComponent),
        title: 'Natours'
    },
    {
        path: 'tour',
        loadChildren: () => import('../tours/tours-routes').then(m => m.routes),
    },
    {
        path: '**',
        loadComponent: () => import('./ui/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
        title: 'Page Not Found'
    },
];
