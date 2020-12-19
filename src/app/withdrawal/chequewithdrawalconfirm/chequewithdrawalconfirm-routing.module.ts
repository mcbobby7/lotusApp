import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequewithdrawalconfirmPage } from './chequewithdrawalconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: ChequewithdrawalconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequewithdrawalconfirmPageRoutingModule {}
