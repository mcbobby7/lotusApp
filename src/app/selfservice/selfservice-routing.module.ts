import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfservicePage } from './selfservice.page';

const routes: Routes = [
  {
    path: '',
    component: SelfservicePage
  },
  {
    path: 'balance',
    loadChildren: () => import('./balance/balance.module').then( m => m.BalancePageModule)
  },
  {
    path: 'bvn',
    loadChildren: () => import('./bvn/bvn.module').then( m => m.BvnPageModule)
  },
  {
    path: 'accountofficer',
    loadChildren: () => import('./accountofficer/accountofficer.module').then( m => m.AccountofficerPageModule)
  },
  {
    path: 'generatestatement',
    loadChildren: () => import('./generatestatement/generatestatement.module').then( m => m.GeneratestatementPageModule)
  },  {
    path: 'customeraccountlist',
    loadChildren: () => import('./customeraccountlist/customeraccountlist.module').then( m => m.CustomeraccountlistPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfservicePageRoutingModule {}
