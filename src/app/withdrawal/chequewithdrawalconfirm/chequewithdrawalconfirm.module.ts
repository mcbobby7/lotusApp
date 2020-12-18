import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequewithdrawalconfirmPageRoutingModule } from './chequewithdrawalconfirm-routing.module';

import { ChequewithdrawalconfirmPage } from './chequewithdrawalconfirm.page';
import { ProcessingComponent } from 'src/app/processing/processing.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequewithdrawalconfirmPageRoutingModule
  ],
  declarations: [ChequewithdrawalconfirmPage,ProcessingComponent]
})
export class ChequewithdrawalconfirmPageModule {}
