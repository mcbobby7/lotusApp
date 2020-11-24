import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundtransferPageRoutingModule } from './fundtransfer-routing.module';

import { FundtransferPage } from './fundtransfer.page';
import { AmountInputComponent } from '../components/amount-input/amount-input.component';
import { AccountInputComponent } from '../components/account-input/account-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundtransferPageRoutingModule
  ],
  declarations: [FundtransferPage, AccountInputComponent]
})
export class FundtransferPageModule {}
