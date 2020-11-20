import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfServicePage } from './self-service.page';

const routes: Routes = [
  {
    path: '',
    component: SelfServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfServicePageRoutingModule {}
