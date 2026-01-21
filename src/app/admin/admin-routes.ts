import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('../dashboard/ui/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./ui/admin/admin.component').then(m => m.AdminComponent),
            },
            {
                path: 'users',
                loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent),
                title: 'Users'
            },
            {
                path: 'users/:userId',
                loadComponent: () => import('./features/user/user.component').then(m => m.UserComponent),
                title: 'User Details'
            }
        ]
    }
];
