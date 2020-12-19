import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfServicePage } from './self-service.page';

const routes: Routes = [
  {
    path: '',
    component: SelfServicePage
  },
  {
    path: 'request-card',
    loadChildren: () => import('./request-card/request-card.module').then( m => m.RequestCardPageModule)
  },
  {
    path: 'request-debit-card',
    loadChildren: () => import('./request-debit-card/request-debit-card.module').then( m => m.RequestDebitCardPageModule)
  },
  {
    path: 'request-check-book',
    loadChildren: () => import('./request-check-book/request-check-book.module').then( m => m.RequestCheckBookPageModule)
  },
  {
    path: 'request-token',
    loadChildren: () => import('./request-token/request-token.module').then( m => m.RequestTokenPageModule)
  },
  {
    path: 'account-update',
    loadChildren: () => import('./account-update/account-update.module').then( m => m.AccountUpdatePageModule)
  },
  {
    path: 'account-activation',
    loadChildren: () => import('./account-activation/account-activation.module').then( m => m.AccountActivationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfServicePageRoutingModule {}
