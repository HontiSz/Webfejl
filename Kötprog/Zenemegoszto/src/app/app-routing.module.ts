import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { Auth2Guard } from './shared/services/auth2.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [Auth2Guard]
  },
  {
    path: 'pages/register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [Auth2Guard]
  },
  {
    path: 'pages/login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [Auth2Guard]
  },
  {
    path: 'pages/upload',
    loadChildren: () => import('./pages/upload/upload.module').then(m => m.UploadModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages/list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
