import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenaccountPageRoutingModule } from './openaccount-routing.module';

import { OpenaccountPage } from './openaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenaccountPageRoutingModule
  ],
  declarations: [OpenaccountPage]
})
export class OpenaccountPageModule {}
