import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocaltransfertypePageRoutingModule } from './localtransfertype-routing.module';

import { LocaltransfertypePage } from './localtransfertype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocaltransfertypePageRoutingModule
  ],
  declarations: [LocaltransfertypePage]
})
export class LocaltransfertypePageModule {}
