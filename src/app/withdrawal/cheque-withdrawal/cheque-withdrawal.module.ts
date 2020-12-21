import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequeWithdrawalPageRoutingModule } from './cheque-withdrawal-routing.module';

import { ChequeWithdrawalPage } from './cheque-withdrawal.page';
import { AccountInputComponent } from '../../components/account-input/account-input.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequeWithdrawalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChequeWithdrawalPage,AccountInputComponent]
})
export class ChequeWithdrawalPageModule {}
