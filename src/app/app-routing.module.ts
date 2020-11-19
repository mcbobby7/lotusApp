import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {path: '', redirectTo: 'customercare/statement', pathMatch: 'full'},
  {
    path: '',
    // loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'withdrawal',
    loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  },
  {
    path: 'customercare',
    loadChildren: () => import('./customercare/customercare.module').then( m => m.CustomercarePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
