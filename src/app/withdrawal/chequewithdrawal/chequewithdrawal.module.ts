import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequewithdrawalPageRoutingModule } from './chequewithdrawal-routing.module';

import { ChequewithdrawalPage } from './chequewithdrawal.page';
import { AccountInputComponent } from '../../components/account-input/account-input.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChequewithdrawalPageRoutingModule
  ],
  declarations: [ChequewithdrawalPage,AccountInputComponent]
})
export class ChequewithdrawalPageModule {}
