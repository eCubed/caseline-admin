import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'home',
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'login',
      loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'admin',
      canActivate: [authGuard],
      loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
    },
    {
      path: 'edit-case/:caseId',
      canActivate: [authGuard],
      loadComponent: () => import('./pages/edit-case/edit-case.component').then(m => m.EditCaseComponent),
      data: ['admin']
    },
    {
      path: 'about',
      loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
    },
    { path: '**', redirectTo: '/home' }
];
