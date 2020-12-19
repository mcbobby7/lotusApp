import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfertypePageRoutingModule } from './transfertype-routing.module';

import { TransfertypePage } from './transfertype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfertypePageRoutingModule
  ],
  declarations: [TransfertypePage]
})
export class TransfertypePageModule {}
