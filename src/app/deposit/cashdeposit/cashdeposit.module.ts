import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashdepositPageRoutingModule } from './cashdeposit-routing.module';

import { CashdepositPage } from './cashdeposit.page';
import { ApiProvider } from 'src/app/_services/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashdepositPageRoutingModule
  ],
  declarations: [CashdepositPage],
  providers:[ApiProvider]
})
export class CashdepositPageModule {}
