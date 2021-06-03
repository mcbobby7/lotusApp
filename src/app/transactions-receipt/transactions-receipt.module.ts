import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsReceiptPageRoutingModule } from './transactions-receipt-routing.module';

import { TransactionsReceiptPage } from './transactions-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsReceiptPageRoutingModule
  ],
  declarations: [TransactionsReceiptPage]
})
export class TransactionsReceiptPageModule {}
