import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountActivationPageRoutingModule } from './account-activation-routing.module';

import { AccountActivationPage } from './account-activation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountActivationPageRoutingModule
  ],
  declarations: [AccountActivationPage]
})
export class AccountActivationPageModule {}
