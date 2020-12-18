import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountofficerPage } from './accountofficer.page';

const routes: Routes = [
  {
    path: '',
    component: AccountofficerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountofficerPageRoutingModule {}
