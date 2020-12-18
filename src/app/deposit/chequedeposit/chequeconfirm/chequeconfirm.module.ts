import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequeconfirmPageRoutingModule } from './chequeconfirm-routing.module';

import { ChequeconfirmPage } from './chequeconfirm.page';
import { ProcessingComponent } from 'src/app/processing/processing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequeconfirmPageRoutingModule,
    
  ],
  declarations: [ChequeconfirmPage,ProcessingComponent]
})
export class ChequeconfirmPageModule {}
