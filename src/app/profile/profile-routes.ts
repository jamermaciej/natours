import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./ui/profile/profile.component').then(m => m.ProfileComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./feature/settings/settings.component').then(m => m.SettingsComponent),
            },
            {
                path: 'reviews',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('../reviews/feature/my-reviews/my-reviews.component').then(m => m.MyReviewsComponent),
                        title: 'My reviews',
                    },
                    {
                        path: 'new',
                        loadComponent: () => import('../reviews/feature/review/review.component').then(m => m.ReviewComponent),
                        title: 'Add reviews',
                        data: { mode: 'new' },

                    },
                    {
                        path: ':id',
                        loadComponent: () => import('../reviews/feature/review/review.component').then(m => m.ReviewComponent),
                        title: 'Edit Review',
                        data: { mode: 'edit' },
                    }
                ]
            }
        ]
    }
];
