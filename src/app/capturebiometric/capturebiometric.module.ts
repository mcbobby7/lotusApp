import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturebiometricPageRoutingModule } from './capturebiometric-routing.module';

import { CapturebiometricPage } from './capturebiometric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturebiometricPageRoutingModule
  ],
  declarations: [CapturebiometricPage]
})
export class CapturebiometricPageModule {}
