import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { customerGuard } from './core/guards/customer.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent) },
    { path: 'booking', loadComponent: () => import('./features/booking/booking.component').then(c => c.BookingComponent) },
    { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) },
    { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent) },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent),
        canActivate: [authGuard, customerGuard]
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component').then(c => c.AdminComponent),
        canActivate: [authGuard, adminGuard]
    },
    { path: '**', redirectTo: '' }
];
