import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturebiometricPage } from './capturebiometric.page';

const routes: Routes = [
  {
    path: '',
    component: CapturebiometricPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturebiometricPageRoutingModule {}
