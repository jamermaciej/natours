import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { myToursFeature } from '../my-tours/data-access/store/my-tours.state';
import * as myToursEffects from '../my-tours/data-access/store/my-tours.effects';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('../my-tours/feature/my-tours/my-tours.component').then(m => m.MyToursComponent),
        providers: [
            provideEffects(myToursEffects),
            provideState(myToursFeature)
        ]
    }
];
