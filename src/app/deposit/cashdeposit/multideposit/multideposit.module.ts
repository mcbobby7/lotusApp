import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultidepositPageRoutingModule } from './multideposit-routing.module';

import { MultidepositPage } from './multideposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultidepositPageRoutingModule
  ],
  declarations: [MultidepositPage]
})
export class MultidepositPageModule {}
