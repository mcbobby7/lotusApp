import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomeraccountlistPage } from './customeraccountlist.page';

const routes: Routes = [
  {
    path: '',
    component: CustomeraccountlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomeraccountlistPageRoutingModule {}
