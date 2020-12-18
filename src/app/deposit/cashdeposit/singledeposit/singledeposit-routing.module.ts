import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingledepositPage } from './singledeposit.page';

const routes: Routes = [
  {
    path: '',
    component: SingledepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingledepositPageRoutingModule {}
