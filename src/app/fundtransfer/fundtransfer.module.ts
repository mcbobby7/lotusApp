import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundtransferPageRoutingModule } from './fundtransfer-routing.module';

import { FundtransferPage } from './fundtransfer.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FundtransferPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FundtransferPage]
})
export class FundtransferPageModule {}
