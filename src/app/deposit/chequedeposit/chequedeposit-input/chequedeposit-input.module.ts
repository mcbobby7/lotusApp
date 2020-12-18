import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequedepositInputPageRoutingModule } from './chequedeposit-input-routing.module';

import { ChequedepositInputPage } from './chequedeposit-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequedepositInputPageRoutingModule
  ],
  declarations: [ChequedepositInputPage]
})
export class ChequedepositInputPageModule {}
