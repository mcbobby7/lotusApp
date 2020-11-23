import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundtransferPageRoutingModule } from './fundtransfer-routing.module';

import { FundtransferPage } from './fundtransfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundtransferPageRoutingModule
  ],
  declarations: [FundtransferPage]
})
export class FundtransferPageModule {}
