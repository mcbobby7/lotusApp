import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForeigntransferCorrespondentPage } from './foreigntransfer-correspondent.page';

const routes: Routes = [
  {
    path: '',
    component: ForeigntransferCorrespondentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForeigntransferCorrespondentPageRoutingModule {}
