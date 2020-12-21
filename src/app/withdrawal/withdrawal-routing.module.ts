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
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then( m => m.ReceiptPageModule)
  },  {
    path: 'cheque-withdrawal',
    loadChildren: () => import('./cheque-withdrawal/cheque-withdrawal.module').then( m => m.ChequeWithdrawalPageModule)
  },
  {
    path: 'cheque-withdrawal-confirm',
    loadChildren: () => import('./cheque-withdrawal-confirm/cheque-withdrawal-confirm.module').then( m => m.ChequeWithdrawalConfirmPageModule)
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawalPageRoutingModule {}
