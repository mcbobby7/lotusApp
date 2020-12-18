import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultidepositPage } from './multideposit.page';

const routes: Routes = [
  {
    path: '',
    component: MultidepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultidepositPageRoutingModule {}
