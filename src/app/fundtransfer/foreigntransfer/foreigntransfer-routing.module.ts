import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForeigntransferPage } from './foreigntransfer.page';

const routes: Routes = [
  {
    path: '',
    component: ForeigntransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForeigntransferPageRoutingModule {}
