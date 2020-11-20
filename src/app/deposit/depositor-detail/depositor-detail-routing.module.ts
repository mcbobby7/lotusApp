import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositorDetailPage } from './depositor-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DepositorDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositorDetailPageRoutingModule {}
