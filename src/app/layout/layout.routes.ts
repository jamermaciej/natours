import { Routes } from '@angular/router';
import { guestGuard } from '../shared/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tours',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('../home/home.component').then(m => m.HomeComponent),
        title: 'Home'
    },
    {
        path: 'tours',
        loadChildren: () => import('../tours/tours-routes').then(m => m.routes),
    },
    {
        path: 'login',
        canActivate: [guestGuard],
        loadChildren: () => import('../login/login-routes').then(m => m.routes),
        title: 'Login'
    },
    {
        path: 'signup',
        canActivate: [guestGuard],
        loadChildren: () => import('../signup/signup-routes').then(m => m.routes),
        title: 'Signup'
    },
    {
        path: 'profile',
        loadChildren: () => import('../profile/profile-routes').then(m => m.routes),
        title: 'My profile'
    },
    {
        path: 'my-tours',
        loadChildren: () => import('../my-tours/my-tours-routes').then(m => m.routes),
        title: 'My Tours'
    },
    {
        path: 'admin',
        loadChildren: () => import('../admin/admin-routes').then(m => m.routes),
        title: 'Admin'
    },
    {
        path: '**',
        loadComponent: () => import('./ui/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
        title: 'Page Not Found'
    },
];
