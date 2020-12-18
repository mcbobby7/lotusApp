import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequeconfirmPage } from './chequeconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: ChequeconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequeconfirmPageRoutingModule {}
