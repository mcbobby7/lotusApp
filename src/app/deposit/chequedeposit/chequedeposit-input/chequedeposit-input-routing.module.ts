import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequedepositInputPage } from './chequedeposit-input.page';

const routes: Routes = [
  {
    path: '',
    component: ChequedepositInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequedepositInputPageRoutingModule {}
