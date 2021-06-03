import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsReceiptPage } from './transactions-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionsReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsReceiptPageRoutingModule {}
