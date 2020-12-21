import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequeWithdrawalPage } from './cheque-withdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: ChequeWithdrawalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequeWithdrawalPageRoutingModule {}
