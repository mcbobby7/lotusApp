import { GeneratestatementPage } from './generatestatement.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: GeneratestatementPage
  },
  {
    path: 'statement',
    loadChildren: () => import('./statement/statement.module').then( m => m.StatementPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratestatementPageRoutingModule {}
