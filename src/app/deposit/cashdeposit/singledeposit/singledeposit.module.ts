import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingledepositPageRoutingModule } from './singledeposit-routing.module';

import { SingledepositPage } from './singledeposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingledepositPageRoutingModule
  ],
  declarations: [SingledepositPage]
})
export class SingledepositPageModule {}
