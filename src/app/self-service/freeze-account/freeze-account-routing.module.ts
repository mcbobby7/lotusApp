import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreezeAccountPage } from './freeze-account.page';

const routes: Routes = [
  {
    path: '',
    component: FreezeAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreezeAccountPageRoutingModule {}
