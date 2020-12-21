import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForeigntransferCorrespondentPageRoutingModule } from './foreigntransfer-correspondent-routing.module';

import { ForeigntransferCorrespondentPage } from './foreigntransfer-correspondent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForeigntransferCorrespondentPageRoutingModule
  ],
  declarations: [ForeigntransferCorrespondentPage]
})
export class ForeigntransferCorrespondentPageModule {}
