import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountPageRoutingModule } from './amount-routing.module';

import { AmountPage } from './amount.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmountPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AmountPage]
})
export class AmountPageModule {}
