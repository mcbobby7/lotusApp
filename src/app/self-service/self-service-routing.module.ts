import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfServicePage } from './self-service.page';

const routes: Routes = [
  {
    path: '',
    component: SelfServicePage
  },
  {
    path: 'request-card',
    loadChildren: () => import('./request-card/request-card.module').then( m => m.RequestCardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfServicePageRoutingModule {}
