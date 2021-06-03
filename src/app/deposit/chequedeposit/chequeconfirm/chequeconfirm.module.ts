import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequeconfirmPageRoutingModule } from './chequeconfirm-routing.module';

import { ChequeconfirmPage } from './chequeconfirm.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequeconfirmPageRoutingModule,
    
  ],
  declarations: [ChequeconfirmPage]
})
export class ChequeconfirmPageModule {}
