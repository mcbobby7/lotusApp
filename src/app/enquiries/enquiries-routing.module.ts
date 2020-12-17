import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnquiriesPage } from './enquiries.page';

const routes: Routes = [
  {
    path: '',
    component: EnquiriesPage
  },
  {
    path: 'account-verify',
    loadChildren: () => import('./account-verify/account-verify.module').then( m => m.AccountVerifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiriesPageRoutingModule {}
