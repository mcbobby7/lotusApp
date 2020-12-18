import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountofficerPageRoutingModule } from './accountofficer-routing.module';

import { AccountofficerPage } from './accountofficer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountofficerPageRoutingModule
  ],
  declarations: [AccountofficerPage]
})
export class AccountofficerPageModule {}
