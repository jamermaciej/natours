import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./feature/profile/profile.component').then(m => m.ProfileComponent)
    }
];
