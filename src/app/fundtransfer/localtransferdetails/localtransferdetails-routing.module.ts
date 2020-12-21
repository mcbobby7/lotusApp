import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocaltransferdetailsPage } from './localtransferdetails.page';

const routes: Routes = [
  {
    path: '',
    component: LocaltransferdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocaltransferdetailsPageRoutingModule {}
