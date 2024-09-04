import { Routes } from '@angular/router';

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
      loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
    },
    {
      path: 'edit-case/:caseId',
      loadComponent: () => import('./pages/edit-case/edit-case.component').then(m => m.EditCaseComponent)
    },
    {
      path: 'about',
      loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
    },
    { path: '**', redirectTo: '/home' }
];
