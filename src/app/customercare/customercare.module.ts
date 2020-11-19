import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomercarePageRoutingModule } from './customercare-routing.module';

import { CustomercarePage } from './customercare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomercarePageRoutingModule
  ],
  declarations: [CustomercarePage]
})
export class CustomercarePageModule {}
