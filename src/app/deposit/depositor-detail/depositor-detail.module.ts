import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositorDetailPageRoutingModule } from './depositor-detail-routing.module';

import { DepositorDetailPage } from './depositor-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DepositorDetailPageRoutingModule
  ],
  declarations: [DepositorDetailPage]
})
export class DepositorDetailPageModule {}
