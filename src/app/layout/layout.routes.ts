import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';

export const routes: Routes = [
        {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('../home/home.component').then(m => m.HomeComponent),
        title: 'Home'
    },
    {
        path: '**',
        loadComponent: () => import('./ui/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
        title: 'Page Not Found'
    },
];
