import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocaltransfertypePage } from './localtransfertype.page';

const routes: Routes = [
  {
    path: '',
    component: LocaltransfertypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocaltransfertypePageRoutingModule {}
