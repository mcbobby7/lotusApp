import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForeigntransferPageRoutingModule } from './foreigntransfer-routing.module';

import { ForeigntransferPage } from './foreigntransfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForeigntransferPageRoutingModule
  ],
  declarations: [ForeigntransferPage]
})
export class ForeigntransferPageModule {}
