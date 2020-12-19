import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestTokenPage } from './request-token.page';

const routes: Routes = [
  {
    path: '',
    component: RequestTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestTokenPageRoutingModule {}
