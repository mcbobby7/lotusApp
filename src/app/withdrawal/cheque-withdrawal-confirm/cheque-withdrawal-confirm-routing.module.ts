import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequeWithdrawalConfirmPage } from './cheque-withdrawal-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ChequeWithdrawalConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequeWithdrawalConfirmPageRoutingModule {}
