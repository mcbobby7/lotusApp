import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountPageRoutingModule } from './amount-routing.module';

import { AmountPage } from './amount.page';
import { AmountInputComponent } from 'src/app/components/amount-input/amount-input.component';
import { AccountInputComponent } from 'src/app/components/account-input/account-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmountPageRoutingModule
  ],
  declarations: [AmountPage, AmountInputComponent, AccountInputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmountPageModule {}
