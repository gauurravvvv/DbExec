import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent,
  },
  { 
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
      },
      {
        path: 'system',
        children: [
          {
            path: 'super-admin',
            loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
          },
          {
            path: 'organizations',
            loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
          },
          {
            path: 'org-admin',
            loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
          },
          {
            path: 'users',
            loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
          }
        ]
      },
      {
        path: 'database',
        children: [
          {
            path: 'setup',
            loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
          },
          {
            path: 'configure',
            children: [
              {
                path: 'schema',
                loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
              },
              {
                path: 'role',
                loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
              },
              {
                path: 'table',
                loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
              }
            ]
          }
        ]
      },
      {
        path: 'query-executor',
        loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
      },
      { 
        path: 'profile', 
        component: ProfileComponent
      },
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 