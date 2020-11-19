import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositPage } from './deposit.page';

const routes: Routes = [
  {
    path: '',
    component: DepositPage
  },
  {
    path: 'depositor-detail',
    loadChildren: () => import('./depositor-detail/depositor-detail.module').then( m => m.DepositorDetailPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then( m => m.ReceiptPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositPageRoutingModule {}
