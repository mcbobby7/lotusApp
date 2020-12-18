import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfservicePageRoutingModule } from './selfservice-routing.module';

import { SelfservicePage } from './selfservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfservicePageRoutingModule
  ],
  declarations: [SelfservicePage]
})
export class SelfservicePageModule {}
