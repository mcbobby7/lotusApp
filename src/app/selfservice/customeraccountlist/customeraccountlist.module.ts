import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomeraccountlistPageRoutingModule } from './customeraccountlist-routing.module';

import { CustomeraccountlistPage } from './customeraccountlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomeraccountlistPageRoutingModule
  ],
  declarations: [CustomeraccountlistPage]
})
export class CustomeraccountlistPageModule {}
