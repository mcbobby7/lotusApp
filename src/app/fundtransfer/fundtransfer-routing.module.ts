import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundtransferPage } from './fundtransfer.page';

const routes: Routes = [
  {
    path: '',
    component: FundtransferPage
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
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundtransferPageRoutingModule {}
