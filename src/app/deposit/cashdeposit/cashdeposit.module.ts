import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashdepositPageRoutingModule } from './cashdeposit-routing.module';

import { CashdepositPage } from './cashdeposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashdepositPageRoutingModule
  ],
  declarations: [CashdepositPage]
})
export class CashdepositPageModule {}
