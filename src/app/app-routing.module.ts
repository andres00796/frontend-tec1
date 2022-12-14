import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'new-contact',
    loadChildren: () => import('./contact/new-contact/new-contact.module').then( m => m.NewContactPageModule)
  },
  {
    path: 'datail-contact/:id',
    loadChildren: () => import('./contact/datail-contact/datail-contact.module').then( m => m.DatailContactPageModule)
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () => import('./contact/edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  },
  {
    path: 'list-contact',
    loadChildren: () => import('./contact/list-contact/list-contact.module').then( m => m.ListContactPageModule)
  },
  {
    path: 'detail-user/:id',
    loadChildren: () => import('./user/detail-user/detail-user.module').then( m => m.DetailUserPageModule)
  },
  {
    path: 'list-user',
    loadChildren: () => import('./user/list-user/list-user.module').then( m => m.ListUserPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'detail-product',
    loadChildren: () => import('./pages/detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  },  {
    path: 'register-product',
    loadChildren: () => import('./pages/register-product/register-product.module').then( m => m.RegisterProductPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
