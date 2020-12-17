import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  
  //  {path: '', redirectTo: 'deposit/receipt', pathMatch: 'full'},
  {
    path: '',
    // redirectTo: 'self-service/request-card',
    // pathMatch: 'full'
    // loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
    // loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
    // loadChildren: () => import('./deposit/deposit.module').then( m => m.DepositPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    //loadChildren: () => import('./capturebiometric/capturebiometric.module').then(m => m.CapturebiometricPageModule)
  },
  {
    path: 'withdrawal',
    loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule),
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
    loadChildren: () => import('./self-service/self-service.module').then( m => m.SelfServicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customercare',
    loadChildren: () => import('./customercare/customercare.module').then( m => m.CustomercarePageModule),
  },
  {
    path: 'fundtransfer',
    loadChildren: () => import('./fundtransfer/fundtransfer.module').then( m => m.FundtransferPageModule)
  },
  {
    path: 'capturebiometric',
    loadChildren: () => import('./capturebiometric/capturebiometric.module').then( m => m.CapturebiometricPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
