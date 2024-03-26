import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./feature/signup.component').then(m => m.SignupComponent),
  }
];
