import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequedepositordetailsPage } from './chequedepositordetails.page';

const routes: Routes = [
  {
    path: '',
    component: ChequedepositordetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequedepositordetailsPageRoutingModule {}
