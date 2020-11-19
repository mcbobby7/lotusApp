import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfServicePageRoutingModule } from './self-service-routing.module';

import { SelfServicePage } from './self-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfServicePageRoutingModule
  ],
  declarations: [SelfServicePage]
})
export class SelfServicePageModule {}
