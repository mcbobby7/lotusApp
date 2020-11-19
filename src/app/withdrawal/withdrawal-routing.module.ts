import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawalPage } from './withdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawalPage
  },
  {
    path: 'amount',
    loadChildren: () => import('./amount/amount.module').then( m => m.AmountPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawalPageRoutingModule {}
