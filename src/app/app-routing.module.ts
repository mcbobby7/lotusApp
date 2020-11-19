import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'self-service/request-card',
    pathMatch: 'full'
    // loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
    // loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
    // loadChildren: () => import('./deposit/deposit.module').then( m => m.DepositPageModule)
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'withdrawal',
    loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  },
  {
    path: 'deposit',
    loadChildren: () => import('./deposit/deposit.module').then( m => m.DepositPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'self-service',
    loadChildren: () => import('./self-service/self-service.module').then( m => m.SelfServicePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
