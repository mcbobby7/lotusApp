import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountUpdatePage } from './account-update.page';

const routes: Routes = [
  {
    path: '',
    component: AccountUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountUpdatePageRoutingModule {}
