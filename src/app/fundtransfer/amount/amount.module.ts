import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountPageRoutingModule } from './amount-routing.module';

import { AmountPage } from './amount.page';

import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AmountPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AmountPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmountPageModule {}
