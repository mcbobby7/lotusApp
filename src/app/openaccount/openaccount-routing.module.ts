import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenaccountPage } from './openaccount.page';

const routes: Routes = [
  {
    path: '',
    component: OpenaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenaccountPageRoutingModule {}
