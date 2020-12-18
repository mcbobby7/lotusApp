import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},

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
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dashbord',
    loadChildren: () => import('./dashbord/dashbord.module').then( m => m.DashbordPageModule)
  },
  {
    path: 'cashdeposit',
    loadChildren: () => import('./deposit/cashdeposit/cashdeposit.module').then( m => m.CashdepositPageModule)
  },
  {
    path: 'singledeposit',
    loadChildren: () => import('./deposit/cashdeposit/singledeposit/singledeposit.module').then( m => m.SingledepositPageModule)
  },
  {
    path: 'multideposit',
    loadChildren: () => import('./deposit/cashdeposit/multideposit/multideposit.module').then( m => m.MultidepositPageModule)
  },
  {
    path: 'chequedeposit',
    loadChildren: () => import('./deposit/chequedeposit/chequedeposit.module').then( m => m.ChequedepositPageModule)
  },
  {
    path: 'chequedepositinput',
    loadChildren: () => import('./deposit/chequedeposit/chequedeposit-input/chequedeposit-input.module').then( m => m.ChequedepositInputPageModule)
  },
  {
    path: 'chequedepositordetails',
    loadChildren: () => import('./deposit/chequedeposit/chequedepositordetails/chequedepositordetails.module').then( m => m.ChequedepositordetailsPageModule)
  },
  {
    path: 'chequeconfirm',
    loadChildren: () => import('./deposit/chequedeposit/chequeconfirm/chequeconfirm.module').then( m => m.ChequeconfirmPageModule)
  },
  {
    path: 'chequewithdrawal',
    loadChildren: () => import('./withdrawal/chequewithdrawal/chequewithdrawal.module').then( m => m.ChequewithdrawalPageModule)
  },
  {
    path: 'chequewithdrawalconfirm',
    loadChildren: () => import('./withdrawal/chequewithdrawalconfirm/chequewithdrawalconfirm.module').then( m => m.ChequewithdrawalconfirmPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
