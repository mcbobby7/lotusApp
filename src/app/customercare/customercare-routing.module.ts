import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomercarePage } from './customercare.page';

const routes: Routes = [
  {
    path: '',
    component: CustomercarePage
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./balance/balance.module').then( m => m.BalancePageModule)
  },
  {
    path: 'statement',
    loadChildren: () => import('./statement/statement.module').then( m => m.StatementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomercarePageRoutingModule {}
