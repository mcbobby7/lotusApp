import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntltrfdetailsPage } from './intltrfdetails.page';

const routes: Routes = [
  {
    path: '',
    component: IntltrfdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntltrfdetailsPageRoutingModule {}
