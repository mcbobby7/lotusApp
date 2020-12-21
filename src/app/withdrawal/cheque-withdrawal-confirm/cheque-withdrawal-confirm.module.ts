import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequeWithdrawalConfirmPageRoutingModule } from './cheque-withdrawal-confirm-routing.module';

import { ChequeWithdrawalConfirmPage } from './cheque-withdrawal-confirm.page';
import { ProcessingComponent } from 'src/app/processing/processing.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequeWithdrawalConfirmPageRoutingModule
  ],
  declarations: [ChequeWithdrawalConfirmPage,ProcessingComponent]
})
export class ChequeWithdrawalConfirmPageModule {}
