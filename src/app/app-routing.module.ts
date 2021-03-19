import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},

  {
    path: 'withdrawal',
    loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalPageModule),
    canLoad: [AuthGuard]
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
    canLoad: [AuthGuard]
  },
  {
    path: 'customercare',
    loadChildren: () => import('./customercare/customercare.module').then(m => m.CustomercarePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'fundtransfer',
    loadChildren: () => import('./fundtransfer/fundtransfer.module').then(m => m.FundtransferPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'capturebiometric',
    loadChildren: () => import('./capturebiometric/capturebiometric.module').then(m => m.CapturebiometricPageModule),
    canLoad: [AuthGuard]
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
    path: 'enquiries',
    loadChildren: () => import('./enquiries/enquiries.module').then(m => m.EnquiriesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'selfservice',
    loadChildren: () => import('./selfservice/selfservice.module').then(m => m.SelfservicePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'transfertype',
    loadChildren: () => import('./fundtransfer/transfertype/transfertype.module').then(m => m.TransfertypePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'localtransfertype',
    loadChildren: () => import('./fundtransfer/localtransfertype/localtransfertype.module').then(m => m.LocaltransfertypePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'localtransferdetails',
    loadChildren: () => import('./fundtransfer/localtransferdetails/localtransferdetails.module').then(m => m.LocaltransferdetailsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'otpvalidation',
    loadChildren: () => import('./otpvalidation/otpvalidation.module').then(m => m.OtpvalidationPageModule),
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./loginpage/loginpage.module').then( m => m.LoginpagePageModule)
  },
  {
    path: 'registerpage',
    loadChildren: () => import('./registerpage/registerpage.module').then( m => m.RegisterpagePageModule)
  },
  {
    path: 'openaccount',
    loadChildren: () => import('./openaccount/openaccount.module').then( m => m.OpenaccountPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
