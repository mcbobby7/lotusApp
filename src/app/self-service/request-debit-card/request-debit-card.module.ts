import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestDebitCardPageRoutingModule } from './request-debit-card-routing.module';

import { RequestDebitCardPage } from './request-debit-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestDebitCardPageRoutingModule
  ],
  declarations: [RequestDebitCardPage]
})
export class RequestDebitCardPageModule {}
